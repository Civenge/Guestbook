"use client";

import { useEffect, useState } from "react";

interface Guest {
  id: string;
  guest: string;
  created_at: Date;
}

const Home = () => {
  const [guests, setGuests] = useState<Guest[]>([]);

  useEffect(() => {
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

    fetchData();
  }, []);

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
    </main>
  );
};

export default Home;
