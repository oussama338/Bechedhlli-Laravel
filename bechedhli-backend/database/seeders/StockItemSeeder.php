<?php

namespace Database\Seeders;

use App\Models\StockItem;
use Illuminate\Database\Seeder;

class StockItemSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            ['name' => 'Panneau Solaire 400W Monocristallin', 'category' => 'Panneaux', 'qty' => 148, 'min_qty' => 20, 'price' => 28500, 'supplier' => 'Jinko Solar', 'location' => 'Entrepôt A'],
            ['name' => 'Panneau Solaire 550W Monocristallin', 'category' => 'Panneaux', 'qty' => 64, 'min_qty' => 15, 'price' => 38500, 'supplier' => 'Longi Solar', 'location' => 'Entrepôt A'],
            ['name' => 'Onduleur Hybride 5kW', 'category' => 'Onduleurs', 'qty' => 7, 'min_qty' => 10, 'price' => 95000, 'supplier' => 'Growatt', 'location' => 'Entrepôt B'],
            ['name' => 'Onduleur Hybride 8kW', 'category' => 'Onduleurs', 'qty' => 12, 'min_qty' => 8, 'price' => 135000, 'supplier' => 'Huawei', 'location' => 'Entrepôt B'],
            ['name' => 'Onduleur On-Grid 10kW', 'category' => 'Onduleurs', 'qty' => 5, 'min_qty' => 5, 'price' => 110000, 'supplier' => 'SMA', 'location' => 'Entrepôt B'],
            ['name' => 'Batterie Lithium 5.12kWh', 'category' => 'Batteries', 'qty' => 18, 'min_qty' => 10, 'price' => 185000, 'supplier' => 'Pylontech', 'location' => 'Entrepôt C'],
            ['name' => 'Batterie Lithium 10.24kWh', 'category' => 'Batteries', 'qty' => 4, 'min_qty' => 5, 'price' => 340000, 'supplier' => 'Pylontech', 'location' => 'Entrepôt C'],
            ['name' => 'Câble Solaire 4mm² (100m)', 'category' => 'Câblage', 'qty' => 35, 'min_qty' => 10, 'price' => 12500, 'supplier' => 'Loccab', 'location' => 'Entrepôt A'],
            ['name' => 'Câble Solaire 6mm² (100m)', 'category' => 'Câblage', 'qty' => 22, 'min_qty' => 8, 'price' => 18000, 'supplier' => 'Loccab', 'location' => 'Entrepôt A'],
            ['name' => 'Structure de Montage Toiture', 'category' => 'Accessoires', 'qty' => 30, 'min_qty' => 15, 'price' => 8500, 'supplier' => 'Aluminium du Sud', 'location' => 'Entrepôt D'],
            ['name' => 'Connecteur MC4 (paire)', 'category' => 'Accessoires', 'qty' => 3, 'min_qty' => 50, 'price' => 350, 'supplier' => 'Stäubli', 'location' => 'Entrepôt D'],
            ['name' => 'Disjoncteur DC 1000V 32A', 'category' => 'Accessoires', 'qty' => 45, 'min_qty' => 20, 'price' => 2800, 'supplier' => 'Schneider', 'location' => 'Entrepôt D'],
            ['name' => 'Parafoudre DC 1000V', 'category' => 'Accessoires', 'qty' => 2, 'min_qty' => 10, 'price' => 6500, 'supplier' => 'Citel', 'location' => 'Entrepôt D'],
            ['name' => 'Compteur d\'Énergie Triphasé', 'category' => 'Accessoires', 'qty' => 15, 'min_qty' => 5, 'price' => 12000, 'supplier' => 'Schneider', 'location' => 'Entrepôt B'],
            ['name' => 'Panneau Solaire 330W Polycristallin', 'category' => 'Panneaux', 'qty' => 0, 'min_qty' => 10, 'price' => 19500, 'supplier' => 'Canadian Solar', 'location' => 'Entrepôt A'],
        ];

        foreach ($items as $item) {
            StockItem::create($item);
        }
    }
}
