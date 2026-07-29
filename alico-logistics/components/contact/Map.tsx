export default function GoogleMap() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">
            Find Our Office
          </h2>

          <p className="text-gray-600 mt-4">
            Visit our headquarters or contact us to schedule a meeting.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl shadow-lg">
          <iframe
            src="https://www.google.com/maps?q=London,United%20Kingdom&output=embed"
            width="100%"
            height="500"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            title="Alico Logistics Location"
          />
        </div>

      </div>
    </section>
  );
}