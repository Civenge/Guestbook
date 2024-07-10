"use client";

import { useEffect, useState } from "react";

interface Guest {
  id: string;
  guest: string;
  created_at: string;
}

const Home = () => {
  const [guests, setGuests] = useState<Guest[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/guest");
        const data: Guest[] = await response.json();
        setGuests(data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        {guests.map((guest) => (
          <p
            key={guest.id}
            className="m-0 max-w-[30ch] text-balance text-sm opacity-50"
          >
            <div className="mb-4">{guest.id}</div>

            <div className="mb-4">{guest.guest}</div>
            <div className="mb-4">{guest.created_at}</div>
          </p>
        ))}
      </div>
    </main>
  );
};

export default Home;
