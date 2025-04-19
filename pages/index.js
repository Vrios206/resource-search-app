// pages/index.js
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [resources, setResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState({
    type: "",
    gender: "",
    location: "",
  });

  useEffect(() => {
    fetch("/mock-resources.json")
      .then((res) => res.json())
      .then((data) => setResources(data));
  }, []);

  const filteredResources = resources.filter((resource) => {
    const matchesSearch = resource.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesType =
      filter.type === "" || resource.resource_type === filter.type;
    const matchesGender =
      filter.gender === "" || resource.gender_served.includes(filter.gender);
    const matchesLocation =
      filter.location === "" ||
      resource.city.toLowerCase().includes(filter.location.toLowerCase()) ||
      resource.state.toLowerCase().includes(filter.location.toLowerCase()) ||
      resource.zip_code.includes(filter.location);

    return matchesSearch && matchesType && matchesGender && matchesLocation;
  });

  return (
    <main className="p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Find Support Resources</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Input
          placeholder="Search by name..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select onValueChange={(val) => setFilter({ ...filter, type: val })}>
          <option value="">All Types</option>
          <option value="Shelter">Shelter</option>
          <option value="Legal Aid">Legal Aid</option>
          <option value="Counseling">Counseling</option>
        </Select>
        <Input
          placeholder="Location (city, state, or ZIP)"
          onChange={(e) => setFilter({ ...filter, location: e.target.value })}
        />
      </div>

      <div className="grid gap-4">
        {filteredResources.map((res, idx) => (
          <Card key={idx} className="p-4">
            <h2 className="text-xl font-semibold mb-2">{res.name}</h2>
            <p className="mb-1">{res.description}</p>
            <p className="text-sm text-gray-600 mb-2">
              {res.city}, {res.state} {res.zip_code}
            </p>
            <div className="flex flex-wrap gap-2 text-sm mb-2">
              {res.resource_type && (
                <span className="bg-gray-100 px-2 py-1 rounded">
                  {res.resource_type}
                </span>
              )}
              {res.gender_served?.map((g, i) => (
                <span
                  key={i}
                  className="bg-pink-100 text-pink-800 px-2 py-1 rounded"
                >
                  {g}
                </span>
              ))}
              {res.age_group?.map((a, i) => (
                <span
                  key={i}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded"
                >
                  {a}
                </span>
              ))}
              {res.population_focus?.map((p, i) => (
                <span
                  key={i}
                  className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded"
                >
                  {p}
                </span>
              ))}
              {res.languages?.map((l, i) => (
                <span
                  key={i}
                  className="bg-green-100 text-green-800 px-2 py-1 rounded"
                >
                  {l}
                </span>
              ))}
            </div>
            <div className="flex gap-4">
              {res.website && (
                <Button asChild>
                  <a href={res.website} target="_blank" rel="noreferrer">
                    Visit Website
                  </a>
                </Button>
              )}
              {res.phone && (
                <Button asChild variant="outline">
                  <a href={`tel:${res.phone}`}>Call Now</a>
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
}
