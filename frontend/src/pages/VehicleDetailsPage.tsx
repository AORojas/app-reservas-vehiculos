import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVehicleById } from "../api/vehicleApi";
import type { VehicleDetails } from "../types/types";
import { vehicleColorImages } from "../data/vehicleColorImages";

const VehicleDetailsPage = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState<VehicleDetails | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("blanco");

  useEffect(() => {
  if (id) {
    getVehicleById(id).then((res) => {
      console.log("EL TÍTULO QUE LLEGA ES:", res.vehicleDetails.title);
      setVehicle(res.vehicleDetails);
    });
  }
}, [id]);

  if (!vehicle) return <p className="text-center mt-20 text-lg">Cargando...</p>;

  // Buscar colores para este auto
  const colorOptions = (vehicleColorImages as Record<string, Record<string, string>>)[vehicle.title] ?? null;
  const imageToShow =
    colorOptions?.[selectedColor] || `${import.meta.env.VITE_API_URL}/${vehicle.imageURL}`;

  return (
    <div className="min-h-screen bg-white p-10 max-w-4xl mx-auto text-black">
      <h1 className="text-3xl font-bold mb-6 text-center">{vehicle.title}</h1>

      <div className="flex flex-col md:flex-row items-center gap-10">

        {/* Imagen */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={imageToShow}
            alt={vehicle.title}
            className="max-h-64 object-contain transition-transform duration-500 hover:scale-110"
          />
        </div>

        {/* Info */}
        <div className="w-full md:w-1/2 space-y-3">
          <p><strong>Año:</strong> {vehicle.year}</p>
          <p><strong>Transmisión:</strong> {vehicle.transmissionType}</p>
          <p><strong>Asientos:</strong> {vehicle.seatingCapacity}</p>
          <p><strong>Garantía:</strong> ARS ${vehicle.warrantyCost}</p>
          <p><strong>Descripción:</strong> {vehicle.description}</p>

          {/* Precio */}
          <p className="text-orange-600 text-2xl font-bold mt-4">
            ARS ${vehicle.pricePerDay}/día
          </p>

          {/* Selector de color */}
          {colorOptions && (
            <div className="mt-4">
              <p className="font-semibold mb-1">Colores disponibles:</p>
              <div className="flex gap-2">
                {Object.keys(colorOptions).map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-1 rounded border text-sm capitalize transition ${
                      selectedColor === color
                        ? "bg-orange-500 text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {color.replace("_", " ")}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button className="mt-6 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">
            Reservar ahora
          </button>

        </div>
      </div>
    </div>
  );
};

export default VehicleDetailsPage;