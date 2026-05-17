<?php

use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\DeliveryNoteController;
use App\Http\Controllers\Api\DeliveryNoteItemController;
use App\Http\Controllers\Api\EmployeeController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\StegDossierController;
use App\Http\Controllers\Api\StockItemController;
use Illuminate\Support\Facades\Route;

Route::apiResource('employees', EmployeeController::class);
Route::apiResource('stock', StockItemController::class);
Route::apiResource('clients', ClientController::class);
Route::apiResource('orders', OrderController::class)->except(['edit', 'create']);
Route::post('orders/{order}/mark-received', [OrderController::class, 'markReceived']);

Route::apiResource('delivery-notes', DeliveryNoteController::class)->except(['edit', 'create']);
Route::get('delivery-notes/next-id', [DeliveryNoteController::class, 'nextId']);
Route::post('delivery-notes/{delivery_note}/mark-delivered', [DeliveryNoteController::class, 'markDelivered']);
Route::post('delivery-notes/{delivery_note}/mark-invoiced', [DeliveryNoteController::class, 'markInvoiced']);

Route::apiResource('steg-dossiers', StegDossierController::class)->except(['edit', 'create']);
Route::post('steg-dossiers/{steg_dossier}/submit', [StegDossierController::class, 'submit']);
Route::post('steg-dossiers/{steg_dossier}/approve', [StegDossierController::class, 'approve']);
Route::post('steg-dossiers/{steg_dossier}/reject', [StegDossierController::class, 'reject']);
