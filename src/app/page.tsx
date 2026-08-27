import Link from "next/link";

function JanSetuMark() {
  return (
    <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1f5b4d] text-lg font-bold text-white">
      J
    </span>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f8f5] px-4 py-5 text-[#1c2b28] sm:px-6 sm:py-8">
      <div className="mx-auto flex min-h-[calc(100vh-2.5rem)] max-w-xl flex-col sm:min-h-[calc(100vh-4rem)]">
        <header className="flex items-center gap-3">
          <JanSetuMark />
          <div>
            <p className="text-lg font-semibold tracking-tight text-[#173d35]">JanSetu</p>
            <p className="text-xs text-[#65736e]">Simple help for public services</p>
          </div>
        </header>

        <section className="my-auto py-10" aria-labelledby="application-title">
          <p className="mb-4 text-sm font-medium text-[#587069]">Your application</p>

          <div className="rounded-2xl border border-[#dde3de] bg-white p-5 shadow-[0_10px_28px_rgba(31,58,50,0.07)] sm:p-7">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h1 id="application-title" className="text-2xl font-semibold leading-tight text-[#173d35] sm:text-3xl">
                  Residence Certificate
                </h1>
                <p className="mt-2 text-sm text-[#65736e]">Applicant: Rahul Kumar</p>
              </div>
              <span className="shrink-0 rounded-full bg-[#fff2d9] px-3 py-1.5 text-sm font-semibold text-[#885400]">
                Needs Correction
              </span>
            </div>

            <div className="rounded-xl border border-[#e5e9e5] bg-[#f8faf8] p-4 sm:p-5">
              <h2 className="text-xl font-semibold text-[#173d35]">Your application needs your attention.</h2>
              <p className="mt-3 text-base leading-7 text-[#4f615c]">
                The application could not be accepted as submitted. Let&apos;s check what needs to be corrected.
              </p>
            </div>

            <dl className="mt-6 border-y border-[#e5e9e5] py-4 text-sm sm:flex sm:items-center sm:justify-between sm:gap-4">
              <div>
                <dt className="text-[#65736e]">Application ID</dt>
                <dd className="mt-1 font-semibold tracking-wide text-[#243832]">DEMO-2026-001</dd>
              </div>
              <div className="mt-3 sm:mt-0">
                <dt className="text-[#65736e]">Status</dt>
                <dd className="mt-1 font-medium text-[#885400]">Needs Correction</dd>
              </div>
            </dl>

            <div className="mt-6 space-y-3">
              <Link href="/recovery" className="flex min-h-12 w-full items-center justify-center rounded-xl bg-[#1f5b4d] px-4 text-base font-semibold text-white transition-colors hover:bg-[#17473c] focus:outline-none focus:ring-4 focus:ring-[#b9d4cc]">
                See what went wrong
              </Link>
              <Link href="#application-details" className="flex min-h-12 w-full items-center justify-center rounded-xl border border-[#b9c8c2] bg-white px-4 text-base font-semibold text-[#245447] transition-colors hover:bg-[#f1f6f3] focus:outline-none focus:ring-4 focus:ring-[#d6e5df]">
                View application details
              </Link>
            </div>

            <div id="application-details" className="mt-5 rounded-xl bg-[#f1f6f3] p-4 text-sm leading-6 text-[#49605a]">
              <p className="font-semibold text-[#2d4e45]">Application details</p>
              <p className="mt-1">Residence Certificate application for Rahul Kumar.</p>
            </div>
          </div>
        </section>

        <footer className="rounded-xl border border-[#dce5e0] bg-[#eef4f0] px-4 py-3 text-center text-xs leading-5 text-[#4b625b]">
          Demo only — JanSetu is not connected to government systems.
        </footer>
      </div>
    </main>
  );
}
