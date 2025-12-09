// src/pages/About.jsx
import React from "react";

export default function About() {
  return (
    <section id="about" className="py-20 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Compliance Suite</h2>
          <p className="text-lg text-gray-700 mb-6">
            Compliance Suite helps FinTech companies automate identity verification and AML monitoring
            with production-grade OCR, face verification, and a configurable AML engine. We reduce
            verification time, lower false positives, and provide audit-ready workflows so compliance
            teams can focus on real risk.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="font-semibold mb-2">Our Mission</h4>
              <p className="text-sm text-gray-600">
                Make compliance faster and safer by automating repetitive work and surfacing true risk.
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="font-semibold mb-2">Security & Privacy</h4>
              <p className="text-sm text-gray-600">
                Data encrypted in transit and at rest, role-based access controls, and auditable logs for regulators.
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="font-semibold mb-2">Integrations</h4>
              <p className="text-sm text-gray-600">
                Simple REST APIs and webhooks let you plug our pipeline into onboarding flows and core systems.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/demo"
              className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow"
            >
              Request Demo
            </a>

            <a
              href="/contact"
              className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700"
            >
              Contact Sales
            </a>
          </div>

          <p className="mt-8 text-sm text-gray-500">
            Trusted by compliance teams. Built for regulatory readiness. Reach out for case studies, SOC-2 details, or an architectural walkthrough.
          </p>
        </div>

        {/* Optional: small team / founders section */}
        <div className="mt-16 max-w-5xl mx-auto">
          <h3 className="text-2xl font-semibold text-center mb-6">Our Team</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
              <div className="h-20 w-20 rounded-full bg-blue-100 mx-auto flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-blue-700">A</span>
              </div>
              <p className="font-semibold">Atharv Patil</p>
              <p className="text-sm text-gray-500">Founder • Product</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
              <div className="h-20 w-20 rounded-full bg-blue-100 mx-auto flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-blue-700">M</span>
              </div>
              <p className="font-semibold">Meera Singh</p>
              <p className="text-sm text-gray-500">Engineering Lead</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
              <div className="h-20 w-20 rounded-full bg-blue-100 mx-auto flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-blue-700">R</span>
              </div>
              <p className="font-semibold">Ravi Kumar</p>
              <p className="text-sm text-gray-500">Compliance & Ops</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
