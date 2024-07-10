"use client";

import { useEffect, useState } from "react";

interface Guest {
  id: string;
  guest: string;
  created_at: Date;
}

const Home = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [newGuestName, setNewGuestName] = useState<string>("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/guest");
      const data: Guest[] = await response.json();

      const guestsWithFormattedDates = data.map((guest) => ({
        ...guest,
        created_at: new Date(guest.created_at),
      }));

      setGuests(guestsWithFormattedDates);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/guest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ guest: newGuestName }),
      });

      if (!response.ok) {
        throw new Error("Failed to add guest");
      }

      const newGuest: Guest = await response.json();
      setGuests([
        ...guests,
        { ...newGuest, created_at: new Date(newGuest.created_at) },
      ]);
      setNewGuestName(""); // Clear the input field after submission
    } catch (error) {
      console.error("Error adding guest:", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="max-w-5xl mx-auto">
        <ul className="divide-y divide-gray-200">
          {guests.map((guest) => (
            <li key={guest.id} className="py-4">
              <div className="flex items-center justify-between">
                <div className="text-lg font-semibold">{guest.guest}</div>
                <div className="ml-4 text-sm text-gray-500">
                  {guest.created_at.toLocaleString()}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Form for adding new guest */}
      <form onSubmit={handleSubmit} className="mt-8">
        <input
          type="text"
          value={newGuestName}
          onChange={(e) => setNewGuestName(e.target.value)}
          className="py-2 px-4 mr-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Enter guest name"
          required
        />
        <button
          type="submit"
          className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Add Guest
        </button>
      </form>
    </main>
  );
};

export default Home;
