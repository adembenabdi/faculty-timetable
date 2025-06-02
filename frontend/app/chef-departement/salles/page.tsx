"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { ArrowLeft, Plus, Search, Edit, Trash2, MapPin, Users, Monitor, Eye } from "lucide-react"

// Mock rooms data - only for Informatique department
const mockRooms = [
  {
    id: "1",
    name: "Lab Informatique 1",
    type: "TP",
    capacity: 25,
    department: "Informatique",
    location: "Bâtiment Info - 1er étage",
    equipment: ["25 PC", "Projecteur", "Tableau blanc"],
    status: "Disponible",
  },
  {
    id: "2",
    name: "Lab Informatique 2",
    type: "TP",
    capacity: 30,
    department: "Informatique",
    location: "Bâtiment Info - 1er étage",
    equipment: ["30 PC", "Projecteur", "Tableau numérique"],
    status: "Maintenance",
  },
  {
    id: "3",
    name: "Salle Info 101",
    type: "TD",
    capacity: 40,
    department: "Informatique",
    location: "Bâtiment Info - RDC",
    equipment: ["Projecteur", "Tableau blanc"],
    status: "Disponible",
  },
  {
    id: "4",
    name: "Salle Info 102",
    type: "TD",
    capacity: 35,
    department: "Informatique",
    location: "Bâtiment Info - RDC",
    equipment: ["Projecteur", "Tableau blanc", "Système audio"],
    status: "Occupée",
  },
  {
    id: "5",
    name: "Amphi Info",
    type: "Amphithéâtre",
    capacity: 120,
    department: "Informatique",
    location: "Bâtiment Info - RDC",
    equipment: ["Projecteur", "Micro", "Tableau numérique", "Système audio"],
    status: "Disponible",
  },
]

const roomTypes = ["Amphithéâtre", "TD", "TP"]

export default function ChefDepartementRoomsPage() {
  const [rooms, setRooms] = useState(mockRooms)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState<any>(null)
  const [newRoom, setNewRoom] = useState({
    name: "",
    type: "",
    capacity: "",
    location: "",
    equipment: "",
  })

  const filteredRooms = rooms.filter(
    (room) =>
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddRoom = () => {
    const room = {
      id: (rooms.length + 1).toString(),
      ...newRoom,
      capacity: Number.parseInt(newRoom.capacity),
      department: "Informatique", // Fixed to current department
      equipment: newRoom.equipment.split(",").map((item) => item.trim()),
      status: "Disponible",
    }
    setRooms([...rooms, room])
    setNewRoom({ name: "", type: "", capacity: "", location: "", equipment: "" })
    setIsAddDialogOpen(false)
  }

  const handleEditRoom = () => {
    const updatedRooms = rooms.map((room) =>
      room.id === selectedRoom.id
        ? {
            ...selectedRoom,
            capacity: Number.parseInt(selectedRoom.capacity),
            equipment:
              typeof selectedRoom.equipment === "string"
                ? selectedRoom.equipment.split(",").map((item: string) => item.trim())
                : selectedRoom.equipment,
          }
        : room,
    )
    setRooms(updatedRooms)
    setIsEditDialogOpen(false)
    setSelectedRoom(null)
  }

  const handleDeleteRoom = (roomId: string) => {
    setRooms(rooms.filter((room) => room.id !== roomId))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Disponible":
        return <Badge className="bg-green-100 text-green-800">Disponible</Badge>
      case "Occupée":
        return <Badge className="bg-red-100 text-red-800">Occupée</Badge>
      case "Maintenance":
        return <Badge className="bg-yellow-100 text-yellow-800">Maintenance</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getRoomIcon = (type: string) => {
    switch (type) {
      case "Amphithéâtre":
        return <Users className="h-4 w-4" />
      case "TP":
        return <Monitor className="h-4 w-4" />
      default:
        return <MapPin className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link href="/chef-departement">
              <Button variant="ghost" size="sm" className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gestion des Salles</h1>
              <p className="text-gray-600">Département d'Informatique</p>
            </div>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Ajouter une Salle
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Ajouter une Nouvelle Salle</DialogTitle>
                <DialogDescription>Remplissez les informations de la nouvelle salle du département.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Nom
                  </Label>
                  <Input
                    id="name"
                    value={newRoom.name}
                    onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Type
                  </Label>
                  <Select value={newRoom.type} onValueChange={(value) => setNewRoom({ ...newRoom, type: value })}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Sélectionner le type" />
                    </SelectTrigger>
                    <SelectContent>
                      {roomTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="capacity" className="text-right">
                    Capacité
                  </Label>
                  <Input
                    id="capacity"
                    type="number"
                    value={newRoom.capacity}
                    onChange={(e) => setNewRoom({ ...newRoom, capacity: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">
                    Localisation
                  </Label>
                  <Input
                    id="location"
                    value={newRoom.location}
                    onChange={(e) => setNewRoom({ ...newRoom, location: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="equipment" className="text-right">
                    Équipements
                  </Label>
                  <Textarea
                    id="equipment"
                    placeholder="Séparer par des virgules"
                    value={newRoom.equipment}
                    onChange={(e) => setNewRoom({ ...newRoom, equipment: e.target.value })}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleAddRoom}>
                  Ajouter
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher par nom ou type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rooms Table */}
        <Card>
          <CardHeader>
            <CardTitle>Salles du Département ({filteredRooms.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Capacité</TableHead>
                  <TableHead>Localisation</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRooms.map((room) => (
                  <TableRow key={room.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        {getRoomIcon(room.type)}
                        <span className="ml-2">{room.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{room.type}</TableCell>
                    <TableCell>{room.capacity} places</TableCell>
                    <TableCell>{room.location}</TableCell>
                    <TableCell>{getStatusBadge(room.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Link href={`/salles/${room.id}`}>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedRoom({
                              ...room,
                              equipment: room.equipment.join(", "),
                            })
                            setIsEditDialogOpen(true)
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteRoom(room.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Modifier la Salle</DialogTitle>
              <DialogDescription>Modifiez les informations de la salle.</DialogDescription>
            </DialogHeader>
            {selectedRoom && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-name" className="text-right">
                    Nom
                  </Label>
                  <Input
                    id="edit-name"
                    value={selectedRoom.name}
                    onChange={(e) => setSelectedRoom({ ...selectedRoom, name: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-type" className="text-right">
                    Type
                  </Label>
                  <Select
                    value={selectedRoom.type}
                    onValueChange={(value) => setSelectedRoom({ ...selectedRoom, type: value })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {roomTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-capacity" className="text-right">
                    Capacité
                  </Label>
                  <Input
                    id="edit-capacity"
                    type="number"
                    value={selectedRoom.capacity}
                    onChange={(e) => setSelectedRoom({ ...selectedRoom, capacity: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-location" className="text-right">
                    Localisation
                  </Label>
                  <Input
                    id="edit-location"
                    value={selectedRoom.location}
                    onChange={(e) => setSelectedRoom({ ...selectedRoom, location: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-equipment" className="text-right">
                    Équipements
                  </Label>
                  <Textarea
                    id="edit-equipment"
                    value={selectedRoom.equipment}
                    onChange={(e) => setSelectedRoom({ ...selectedRoom, equipment: e.target.value })}
                    className="col-span-3"
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button type="submit" onClick={handleEditRoom}>
                Sauvegarder
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
