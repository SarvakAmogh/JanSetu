import Link from "next/link";

export default function RecoveryHandoffPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f8f5] px-4 py-8 text-[#1c2b28]">
      <section className="w-full max-w-xl rounded-2xl border border-[#dde3de] bg-white p-6 text-center shadow-[0_10px_28px_rgba(31,58,50,0.07)] sm:p-8">
        <p className="text-sm font-medium text-[#587069]">Residence Certificate</p>
        <h1 className="mt-3 text-2xl font-semibold text-[#173d35]">Let&apos;s check what went wrong</h1>
        <p className="mt-3 leading-7 text-[#4f615c]">
          The next step will explain the correction needed for this demo application.
        </p>
        <Link href="/" className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl border border-[#b9c8c2] px-5 text-base font-semibold text-[#245447] hover:bg-[#f1f6f3] focus:outline-none focus:ring-4 focus:ring-[#d6e5df]">
          Back to application
        </Link>
        <p className="mt-6 text-xs leading-5 text-[#4b625b]">
          Demo only — JanSetu is not connected to government systems.
        </p>
      </section>
    </main>
  );
}
