<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\Order;
use Illuminate\Database\Seeder;

class ClientSeeder extends Seeder
{
    public function run(): void
    {
        $clients = [
            [
                'name' => 'Mohamed Benmerzoug', 'cin' => '123456789012', 'phone' => '+216 555 201 001',
                'address' => 'Cité 1000 Logements, Ouargla', 'created_at' => '2024-01-15',
                'orders' => [
                    ['items' => ['Panneau Solaire 400W Monocristallin x12', 'Onduleur Hybride 5kW x1', 'Batterie Lithium 5.12kWh x2'], 'total' => 1124000, 'received' => true, 'received_date' => '2024-02-28', 'order_date' => '2024-01-20'],
                    ['items' => ['Structure de Montage Toiture x12', 'Câble Solaire 6mm² (100m) x5'], 'total' => 202500, 'received' => true, 'received_date' => '2024-03-05', 'order_date' => '2024-01-20'],
                ],
            ],
            [
                'name' => 'Aïcha Djelloul', 'cin' => '234567890123', 'phone' => '+216 555 302 002',
                'address' => "Rue des Frères Bouadou, Ghardaïa", 'created_at' => '2024-02-10',
                'orders' => [
                    ['items' => ['Panneau Solaire 550W Monocristallin x16', 'Onduleur Hybride 8kW x1', 'Batterie Lithium 10.24kWh x2', 'Parafoudre DC 1000V x3'], 'total' => 2146000, 'received' => false, 'received_date' => null, 'order_date' => '2024-02-15'],
                ],
            ],
            [
                'name' => 'Société EPI Tunisie SARL', 'cin' => '002016045789012', 'phone' => '+216 555 403 003',
                'address' => 'Zone Industrielle, Hassi Messaoud', 'created_at' => '2023-11-05',
                'orders' => [
                    ['items' => ['Panneau Solaire 400W Monocristallin x48', 'Onduleur On-Grid 10kW x4', "Compteur d'Énergie Triphasé x4"], 'total' => 3028000, 'received' => true, 'received_date' => '2023-12-20', 'order_date' => '2023-11-10'],
                    ['items' => ['Panneau Solaire 400W Monocristallin x24', 'Onduleur Hybride 5kW x2'], 'total' => 1606000, 'received' => true, 'received_date' => '2024-01-25', 'order_date' => '2023-12-15'],
                    ['items' => ['Batterie Lithium 5.12kWh x6', 'Disjoncteur DC 1000V 32A x12'], 'total' => 1446000, 'received' => false, 'received_date' => null, 'order_date' => '2024-03-01'],
                ],
            ],
            [
                'name' => 'Karim Hadj-Said', 'cin' => '345678901234', 'phone' => '+216 555 504 004',
                'address' => 'Lot 14, Nouvelle Ville, Biskra', 'created_at' => '2024-03-01',
                'orders' => [
                    ['items' => ['Panneau Solaire 400W Monocristallin x8', 'Onduleur Hybride 5kW x1', 'Batterie Lithium 5.12kWh x1', 'Connecteur MC4 (paire) x20', 'Structure de Montage Toiture x8'], 'total' => 786000, 'received' => true, 'received_date' => '2024-04-10', 'order_date' => '2024-03-05'],
                ],
            ],
            [
                'name' => 'Nadia Benmansour', 'cin' => '456789012345', 'phone' => '+216 555 605 005',
                'address' => 'Cité 500 Logements, El Oued', 'created_at' => '2024-03-20',
                'orders' => [
                    ['items' => ['Panneau Solaire 550W Monocristallin x6', 'Onduleur Hybride 5kW x1', 'Batterie Lithium 5.12kWh x1'], 'total' => 685000, 'received' => false, 'received_date' => null, 'order_date' => '2024-03-25'],
                ],
            ],
            [
                'name' => 'Entreprise TASWIT SARL', 'cin' => '001915078901234', 'phone' => '+216 555 706 006',
                'address' => "Pôle d'Activité, Touggourt", 'created_at' => '2023-09-12',
                'orders' => [
                    ['items' => ['Panneau Solaire 400W Monocristallin x96', 'Onduleur On-Grid 10kW x8', 'Structure de Montage Toiture x96', 'Câble Solaire 4mm² (100m) x20', 'Disjoncteur DC 1000V 32A x24', 'Parafoudre DC 1000V x8', "Compteur d'Énergie Triphasé x8"], 'total' => 7548000, 'received' => true, 'received_date' => '2023-11-30', 'order_date' => '2023-09-20'],
                    ['items' => ['Batterie Lithium 10.24kWh x8'], 'total' => 2720000, 'received' => true, 'received_date' => '2024-01-15', 'order_date' => '2023-11-01'],
                ],
            ],
            [
                'name' => 'Rachid Mekki', 'cin' => '567890123456', 'phone' => '+216 555 807 007',
                'address' => 'Rue Principale, Laghouat', 'created_at' => '2024-04-02',
                'orders' => [
                    ['items' => ['Panneau Solaire 400W Monocristallin x6', 'Onduleur Hybride 5kW x1'], 'total' => 421000, 'received' => false, 'received_date' => null, 'order_date' => '2024-04-05'],
                ],
            ],
            [
                'name' => 'Samira Bouzid', 'cin' => '678901234567', 'phone' => '+216 555 908 008',
                'address' => 'Cité Annabi, Constantine', 'created_at' => '2024-02-28',
                'orders' => [
                    ['items' => ['Panneau Solaire 550W Monocristallin x10', 'Onduleur Hybride 8kW x1', 'Batterie Lithium 10.24kWh x1', 'Câble Solaire 6mm² (100m) x4', 'Structure de Montage Toiture x10', 'Disjoncteur DC 1000V 32A x6', 'Parafoudre DC 1000V x2'], 'total' => 1399200, 'received' => true, 'received_date' => '2024-04-20', 'order_date' => '2024-03-05'],
                    ['items' => ['Connecteur MC4 (paire) x30'], 'total' => 10500, 'received' => false, 'received_date' => null, 'order_date' => '2024-04-22'],
                ],
            ],
            [
                'name' => 'Amara Energies SARL', 'cin' => '001822069012345', 'phone' => '+216 555 109 009',
                'address' => 'Zone Industrielle Nord, Batna', 'created_at' => '2024-01-08',
                'orders' => [
                    ['items' => ['Panneau Solaire 400W Monocristallin x32', 'Onduleur Hybride 8kW x2', 'Batterie Lithium 5.12kWh x4'], 'total' => 2556000, 'received' => true, 'received_date' => '2024-02-15', 'order_date' => '2024-01-12'],
                ],
            ],
            [
                'name' => 'Yassine Khellaf', 'cin' => '789012345678', 'phone' => '+216 555 210 010',
                'address' => 'Lot 8, Zeribet El Oued', 'created_at' => '2024-04-10',
                'orders' => [
                    ['items' => ['Panneau Solaire 330W Polycristallin x10'], 'total' => 195000, 'received' => false, 'received_date' => null, 'order_date' => '2024-04-12'],
                ],
            ],
        ];

        foreach ($clients as $c) {
            $orders = $c['orders'] ?? [];
            unset($c['orders']);
            $client = Client::create($c);
            foreach ($orders as $o) {
                $client->orders()->create($o);
            }
        }
    }
}
