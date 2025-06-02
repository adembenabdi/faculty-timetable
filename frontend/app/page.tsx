import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { GraduationCap, Building2, Calculator, Monitor, Atom, Leaf } from "lucide-react"

const departments = [
  {
    name: "Architecture",
    slug: "architecture",
    icon: Building2,
    color: "bg-blue-500",
  },
  {
    name: "Mathématiques",
    slug: "mathematiques",
    icon: Calculator,
    color: "bg-green-500",
  },
  {
    name: "Informatique",
    slug: "informatique",
    icon: Monitor,
    color: "bg-purple-500",
  },
  {
    name: "Sciences de la Matière (SM)",
    slug: "sciences-matiere",
    icon: Atom,
    color: "bg-orange-500",
  },
  {
    name: "Sciences de la Nature et de la Vie (SNV)",
    slug: "sciences-nature-vie",
    icon: Leaf,
    color: "bg-emerald-500",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <GraduationCap className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Université de Sciences</h1>
          </div>
          <h2 className="text-2xl text-gray-700 mb-2">Gestion des Emplois du Temps</h2>
          <p className="text-gray-600">Faculté des Sciences - Système de Gestion des Horaires</p>
        </div>

        {/* Navigation Links */}
        <div className="flex justify-center gap-4 mb-8">
          <Link href="/professeurs">
            <Button variant="outline">Tous les Professeurs</Button>
          </Link>
          <Link href="/salles-libres">
            <Button variant="outline">Salles Libres</Button>
          </Link>
          <Link href="/login">
            <Button variant="outline">Connexion Admin</Button>
          </Link>
        </div>

        {/* Department Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {departments.map((dept) => {
            const IconComponent = dept.icon
            return (
              <Link key={dept.slug} href={`/departement/${dept.slug}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className={`${dept.color} p-4 rounded-full mb-4 group-hover:scale-110 transition-transform`}>
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{dept.name}</h3>
                      <p className="text-gray-600 text-sm">Voir les emplois du temps</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500">
          <p>© 2024 Université de Sciences - Système de Gestion des Emplois du Temps</p>
        </div>
      </div>
    </div>
  )
}
