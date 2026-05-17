<?php

namespace Database\Seeders;

use App\Models\DeliveryNote;
use Illuminate\Database\Seeder;

class DeliveryNoteSeeder extends Seeder
{
    public function run(): void
    {
        $bls = [
            [
                'id' => 'BL00040', 'client_id' => 1, 'type' => 'Mono', 'date' => '2024-03-01',
                'status' => 'delivered', 'invoiced' => true, 'puissance' => '3,240 kwc', 'ref_steg' => '20081 289 0',
                'transporteur_name' => 'Aymen Bechedli', 'transporteur_matricule' => '213 Tunis 6198',
                'items' => [
                    ['n' => 1, 'des' => 'Panneau', 'marque' => 'Canadian Solar 405wc', 'cat' => 'panneau', 'qty' => 8],
                    ['n' => 2, 'des' => 'Onduleur', 'marque' => 'SE 3KTL', 'cat' => 'onduleur', 'qty' => 1],
                    ['n' => 3, 'des' => 'Structure', 'marque' => '', 'cat' => 'structure', 'qty' => 1, 'note' => '3,240 kwc'],
                    ['n' => 4, 'des' => 'Béton', 'marque' => '', 'cat' => 'fixation', 'qty' => 16],
                    ['n' => 5, 'des' => 'Ecrou 10', 'marque' => '', 'cat' => 'fixation', 'qty' => 32],
                    ['n' => 6, 'des' => 'MC4 MALE', 'marque' => '', 'cat' => 'câblage', 'qty' => 2],
                    ['n' => 7, 'des' => 'MC4 FEMALE', 'marque' => '', 'cat' => 'câblage', 'qty' => 2],
                    ['n' => 8, 'des' => 'CABLE SOLAIRE 4MM NOIR', 'marque' => '', 'cat' => 'câblage', 'qty' => 24],
                    ['n' => 9, 'des' => 'CABLE SOLAIRE 4MM ROUGE', 'marque' => '', 'cat' => 'câblage', 'qty' => 16],
                    ['n' => 10, 'des' => 'Chemin de câble 35/30', 'marque' => '', 'cat' => 'chemin de câble', 'qty' => 16],
                ],
            ],
            [
                'id' => 'BL00041', 'client_id' => 3, 'type' => 'Tri', 'date' => '2024-04-10',
                'status' => 'delivered', 'invoiced' => false, 'puissance' => '6,480 kwc', 'ref_steg' => '20081 305 2',
                'transporteur_name' => 'Rachid Khelil', 'transporteur_matricule' => '214 Ouargla 7823',
                'items' => [
                    ['n' => 1, 'des' => 'Panneau', 'marque' => 'Jinko Solar 550wc', 'cat' => 'panneau', 'qty' => 12],
                    ['n' => 2, 'des' => 'Onduleur', 'marque' => 'Growatt 8KTL', 'cat' => 'onduleur', 'qty' => 1],
                    ['n' => 3, 'des' => 'Structure', 'marque' => '', 'cat' => 'structure', 'qty' => 1, 'note' => '6,480 kwc'],
                    ['n' => 4, 'des' => 'Tube IRO 25', 'marque' => '', 'cat' => 'Tube IRO', 'qty' => 100],
                    ['n' => 5, 'des' => 'Coffret étanche 8 modules', 'marque' => '', 'cat' => 'coffret', 'qty' => 3],
                ],
            ],
            [
                'id' => 'BL00042', 'client_id' => 2, 'type' => 'Mono', 'date' => '2024-05-18',
                'status' => 'waiting', 'invoiced' => false, 'puissance' => '2,160 kwc', 'ref_steg' => '20082 112 5',
                'transporteur_name' => 'Aymen Bechedli', 'transporteur_matricule' => '213 Tunis 6198',
                'items' => [
                    ['n' => 1, 'des' => 'Panneau', 'marque' => 'Longi Solar 405wc', 'cat' => 'panneau', 'qty' => 6],
                    ['n' => 2, 'des' => 'Onduleur', 'marque' => 'SE 5KTL', 'cat' => 'onduleur', 'qty' => 1],
                    ['n' => 3, 'des' => 'Structure', 'marque' => '', 'cat' => 'structure', 'qty' => 1, 'note' => '2,160 kwc'],
                    ['n' => 4, 'des' => 'Chemin de câble 35/30', 'marque' => '', 'cat' => 'chemin de câble', 'qty' => 10],
                ],
            ],
        ];

        foreach ($bls as $bl) {
            $items = $bl['items'] ?? [];
            unset($bl['items']);
            $dn = DeliveryNote::updateOrCreate(['id' => $bl['id']], $bl);
            foreach ($items as $item) {
                $dn->items()->updateOrCreate(
                    ['delivery_note_id' => $dn->id, 'n' => $item['n']],
                    $item
                );
            }
        }
    }
}
