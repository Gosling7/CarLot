import { useState } from "react";

export default function ListingDetailsPage() {
  // --- MOCK DATA ---
  const listing = {
    id: "1",
    title: "Audi A4 2.0 TDI Quattro 2019",
    price: 44900,
    currency: "PLN",
    description:
      "This Audi A4 is in excellent condition.\n\nFirst owner, full service history.\nNo accidents.\n\nContact us for a test drive.",
    car: {
      make: "Audi",
      model: "A4",
      year: 2019,
      mileageKm: 81250,
      fuelType: "Diesel",
      transmission: "Automatic",
      driveType: "AWD",
      powerHP: 190,
      body: "Sedan",
      location: "Warsaw",
    },
    equipment: [
      "Navigation system",
      "Heated seats",
      "Rear camera",
      "LED headlights",
      "Parking sensors",
      "Bluetooth",
      "Cruise control",
      "Dual-zone climate control",
    ],
    images: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d",
    ],
  };

  const [selectedImage, setSelectedImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(
    "I'm interested in this car. Please contact me."
  );

  function handleSubmitInquiry() {
    console.log({
      listingId: listing.id,
      email,
      message,
    });

    setIsModalOpen(false);
    setEmail("");
  }

  return (
    // <div className="max-w-6xl mx-auto p-6 space-y-10">
    <div className="max-w-7xl mx-auto p-6 space-y-10">

      <h1 className="text-3xl font-bold">{listing.title}</h1>
      <div className="flex flex-wrap gap-3">
        <div className="badge badge-outline">
          {listing.car.year}
        </div>
        <div className="badge badge-outline">
          {listing.car.mileageKm.toLocaleString()} km
        </div>
        <div className="badge badge-outline">
          {listing.car.fuelType}
        </div>
        <div className="badge badge-outline">
          {listing.car.transmission}
        </div>
        <div className="badge badge-outline">
          {listing.car.driveType}
        </div>
        <div className="badge badge-outline">
          {listing.car.powerHP} HP
        </div>
      </div>



      {/* HERO SECTION */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-3"> */}
      <div className="flex flex-col md:flex-row gap-3">

        {/* LEFT SIDE - IMAGE GALLERY */}
        <div className="space-y-4 flex-3/4">
          <div className="rounded-2xl overflow-hidden">
            <img
              src={listing.images[selectedImage]}
              alt="Car"
              className="w-full h-[450px] object-cover"
            />
          </div>

          <div className="flex gap-3">
            {listing.images.map((img, index) => (
              <img
                key={index}
                src={img}
                onClick={() => setSelectedImage(index)}
                className={`h-24 w-36 object-cover rounded-xl cursor-pointer border-2 ${selectedImage === index
                  ? "border-primary"
                  : "border-transparent"
                  }`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT SIDE - PRICE CARD */}
        <div className="card bg-base-100 w-2xl flex-1/4">
          <div className="card-body">
            <h2 className="text-3xl font-bold text-primary">
              {listing.price.toLocaleString()} {listing.currency}
            </h2>

            <button
              className="btn btn-primary w-full mt-4"
              onClick={() => setIsModalOpen(true)}
            >
              Send Inquiry
            </button>

            <div className="divider"></div>

            <div>
              <p className="font-semibold">CarLot Warsaw</p>
              <p>+48 123 456 789</p>
              <p className="text-sm opacity-70">
                {listing.car.location}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SPECIFICATIONS */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">
          Technical Specifications
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Spec label="Make" value={listing.car.make} />
          <Spec label="Model" value={listing.car.model} />
          <Spec label="Body" value={listing.car.body} />
          <Spec label="Mileage" value={listing.car.mileageKm.toString()} />
          <Spec label="Fuel Type" value={listing.car.fuelType} />
          <Spec label="Transmission" value={listing.car.transmission} />
          <Spec label="Drive Type" value={listing.car.driveType} />
          <Spec label="Power" value={`${listing.car.powerHP} HP`} />
        </div>
      </div>

      {/* DESCRIPTION */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Description</h2>
        <p className="whitespace-pre-line leading-relaxed">
          {listing.description}
        </p>
      </div>

      {/* EQUIPMENT */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Equipment</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {listing.equipment.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-primary">✔</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>



      {/* INQUIRY MODAL */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">
              Send Inquiry
            </h3>

            <div className="form-control mb-4">
              <label className="label">Email</label>
              <input
                type="email"
                className="input input-bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">Message</label>
              <textarea
                className="textarea textarea-bordered"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <div className="modal-action">
              <button
                className="btn btn-primary"
                onClick={handleSubmitInquiry}
              >
                Send
              </button>
              <button
                className="btn"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b pb-2">
      <span className="opacity-70">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
