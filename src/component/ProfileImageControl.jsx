import { useEffect, useRef, useState } from 'react';
import {
  getProfileImageFileError,
  PROFILE_IMAGE_ACCEPT
} from '../services/profileImages';

export default function ProfileImageControl({
  id,
  label,
  imageUrl,
  file,
  onFileChange,
  onRemoveImage,
  onUpload,
  isUploading = false,
  disabled = false,
  error = '',
  notice = ''
}) {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [selectionError, setSelectionError] = useState('');

  useEffect(() => {
    if (!file) {
      setPreviewUrl('');
      return undefined;
    }

    if (typeof URL.createObjectURL === 'function') {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }

    const reader = new FileReader();
    reader.onload = () => setPreviewUrl(typeof reader.result === 'string' ? reader.result : '');
    reader.readAsDataURL(file);
    return () => reader.abort();
  }, [file]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) {
      return;
    }

    const validationError = getProfileImageFileError(selectedFile);
    if (validationError) {
      setSelectionError(validationError);
      event.target.value = '';
      return;
    }

    setSelectionError('');
    onFileChange(selectedFile);
  };

  const clearSelection = () => {
    setSelectionError('');
    onFileChange(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const isDisabled = disabled || isUploading;
  const visibleImageUrl = file ? previewUrl : imageUrl;

  return (
    <div className="profile-image-control">
      <label className="profile-image-label" htmlFor={id}>{label}</label>
      {visibleImageUrl ? (
        <img className="profile-image-preview" src={visibleImageUrl} alt={`${label} preview`} />
      ) : (
        <div className="profile-image-placeholder" aria-hidden="true">No image selected</div>
      )}
      {file && <p className="profile-image-filename">Selected: {file.name}</p>}
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept={PROFILE_IMAGE_ACCEPT}
        onChange={handleFileChange}
        disabled={isDisabled}
      />
      <div className="profile-image-actions">
        {file && (
          <button type="button" onClick={clearSelection} disabled={isDisabled}>
            Clear selection
          </button>
        )}
        {file && onUpload && (
          <button type="button" onClick={onUpload} disabled={isDisabled}>
            {isUploading ? 'Uploading…' : error ? 'Retry upload' : 'Upload image'}
          </button>
        )}
        {!file && imageUrl && onRemoveImage && (
          <button
            type="button"
            aria-label={`Remove ${label}`}
            onClick={onRemoveImage}
            disabled={isDisabled}
          >
            Remove current image
          </button>
        )}
      </div>
      {(selectionError || error) && (
        <p className="auth-error" role="alert">{selectionError || error}</p>
      )}
      {notice && <p className="profile-image-notice" role="status">{notice}</p>}
    </div>
  );
}
