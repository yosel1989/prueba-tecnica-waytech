<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');



Route::post('/user' , [\App\Http\Controllers\UserController::class ,'store']);
Route::put('/user/{id}' , [\App\Http\Controllers\UserController::class ,'update']);
Route::get('/user' , [\App\Http\Controllers\UserController::class ,'index']);
Route::get('/user/{id}' , [\App\Http\Controllers\UserController::class ,'edit']);
Route::delete('/user/{id}' , [\App\Http\Controllers\UserController::class ,'destroy']);
