import { Award, Stethoscope } from 'lucide-react';

export default function ConsultantProfile() {
  return (
    <section
      className="bg-slate-50 px-4 py-14 sm:px-6 sm:py-16 lg:px-8"
      aria-labelledby="consultant-profile-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/70 ring-1 ring-slate-200">
          <div className="grid items-center lg:grid-cols-2">
            <div className="relative h-[28rem] sm:h-[31.5rem] lg:h-[38.5rem]">
              <img
                src="https://res.cloudinary.com/dlofql51b/image/upload/v1795165150/130f47ee-0b3b-4795-a157-446bed80db2f_fb53md.png"
                alt="Dr. Hrishikesh Das, consultant physiotherapist"
                className="h-full w-full object-cover object-center"
                loading="lazy"
              />
              <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-teal-800 shadow-lg">
                <Award className="h-4 w-4" aria-hidden="true" />
                12+ years of service
              </div>
            </div>

            <div className="p-6 sm:p-9 lg:p-12">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">
                Meet your physiotherapist
              </p>
              <h2
                id="consultant-profile-heading"
                className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
              >
                Dr. Hrishikesh Das <span className="text-teal-700">(PT)</span>
              </h2>
              <p className="mt-2 text-lg font-medium text-slate-600">
                Consultant Physiotherapist
              </p>
              <p className="mt-5 leading-7 text-slate-600 sm:text-lg sm:leading-8">
                With over 12 years of excellence in physiotherapy, Dr. Hrishikesh Das has been serving
                people with dedicated care and treatment tailored to each person’s needs.
              </p>
              <div className="mt-7 inline-flex items-center gap-3 rounded-xl bg-teal-50 px-4 py-3 text-sm font-medium text-teal-900">
                <Stethoscope className="h-5 w-5 shrink-0 text-teal-700" aria-hidden="true" />
                Experienced, patient-focused care
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}