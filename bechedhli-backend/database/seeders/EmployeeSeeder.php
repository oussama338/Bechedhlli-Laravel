<?php

namespace Database\Seeders;

use App\Models\Employee;
use Illuminate\Database\Seeder;

class EmployeeSeeder extends Seeder
{
    public function run(): void
    {
        $employees = [
            ['name' => 'Ahmed Benali', 'role' => 'Technicien Senior', 'dept' => 'Installation', 'status' => 'active', 'phone' => '+216 555 123 456', 'email' => 'a.benali@bechedhli.tn', 'salary' => 95000, 'join_date' => '2022-03-15'],
            ['name' => 'Fatima Zohra Mebarki', 'role' => 'Directrice Commerciale', 'dept' => 'Direction', 'status' => 'active', 'phone' => '+216 555 234 567', 'email' => 'f.mebarki@bechedhli.tn', 'salary' => 180000, 'join_date' => '2020-01-10'],
            ['name' => 'Karim Bouzid', 'role' => 'Chef de Projet', 'dept' => 'Projets', 'status' => 'active', 'phone' => '+216 555 345 678', 'email' => 'k.bouzid@bechedhli.tn', 'salary' => 130000, 'join_date' => '2021-06-22'],
            ['name' => 'Nadia Cherif', 'role' => 'Responsable RH', 'dept' => 'Ressources Humaines', 'status' => 'active', 'phone' => '+216 555 456 789', 'email' => 'n.cherif@bechedhli.tn', 'salary' => 120000, 'join_date' => '2021-02-08'],
            ['name' => 'Youcef Hamidi', 'role' => 'Technicien', 'dept' => 'Installation', 'status' => 'active', 'phone' => '+216 555 567 890', 'email' => 'y.hamidi@bechedhli.tn', 'salary' => 75000, 'join_date' => '2023-01-20'],
            ['name' => 'Sara Amrani', 'role' => 'Comptable', 'dept' => 'Finance', 'status' => 'active', 'phone' => '+216 555 678 901', 'email' => 's.amrani@bechedhli.tn', 'salary' => 85000, 'join_date' => '2022-09-05'],
            ['name' => 'Mourad Taleb', 'role' => 'Magasinier', 'dept' => 'Stock', 'status' => 'active', 'phone' => '+216 555 789 012', 'email' => 'm.taleb@bechedhli.tn', 'salary' => 65000, 'join_date' => '2023-04-12'],
            ['name' => 'Amina Ziani', 'role' => 'Technicienne', 'dept' => 'Maintenance', 'status' => 'leave', 'phone' => '+216 555 890 123', 'email' => 'a.ziani@bechedhli.tn', 'salary' => 80000, 'join_date' => '2022-11-30'],
            ['name' => 'Rachid Khelil', 'role' => 'Livreur', 'dept' => 'Logistique', 'status' => 'active', 'phone' => '+216 555 901 234', 'email' => 'r.khelil@bechedhli.tn', 'salary' => 60000, 'join_date' => '2023-07-01'],
            ['name' => 'Leila Boudiaf', 'role' => 'Assistante Direction', 'dept' => 'Direction', 'status' => 'active', 'phone' => '+216 555 012 345', 'email' => 'l.boudiaf@bechedhli.tn', 'salary' => 70000, 'join_date' => '2022-05-18'],
            ['name' => 'Omar Fekhar', 'role' => 'Technicien', 'dept' => 'Installation', 'status' => 'inactive', 'phone' => '+216 555 111 222', 'email' => 'o.fekhar@bechedhli.tn', 'salary' => 75000, 'join_date' => '2021-08-14'],
            ['name' => 'Djamila Saadi', 'role' => 'Chargée de Clientèle', 'dept' => 'Commercial', 'status' => 'active', 'phone' => '+216 555 333 444', 'email' => 'd.saadi@bechedhli.tn', 'salary' => 90000, 'join_date' => '2023-02-28'],
        ];

        foreach ($employees as $emp) {
            Employee::create($emp);
        }
    }
}
