<?php

namespace App\Http\Controllers;

use App\Http\Requests\DeleteDestroyUser;
use App\Http\Requests\GetFindUser;
use App\Http\Requests\PostCreateUser;
use App\Http\Requests\PutUpdateUser;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json([
            'data'      => User::all(),
            'error'     => null,
            'status'    => 200
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PostCreateUser $request)
    {
        try {
            User::create([
                'name' => $request->name,
                'phone' => $request->phone,
                'email' => $request->email,
                'company' => $request->company,
                'address' => $request->address,
                'latitude' => $request->latitude,
                'longitude' => $request->longitude,
            ]);

            return response()->json([
                'data'      => null,
                'error'     => null,
                'status'    => 201
            ]);
        }catch (\Exception $e){
            return response()->json([
                'data'      => null,
                'error'     => $e->getMessage(),
                'status'    => 400
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(GetFindUser $request)
    {
        try {
            $user = User::findOrFail($request->id);

            return response()->json([
                'data'      => [
                    'name' => $user->name,
                    'phone' => $user->phone,
                    'email' => $user->email,
                    'company' => $user->company,
                    'address' => $user->address,
                    'latitude' => $user->latitude,
                    'longitude' => $user->longitude,
                ],
                'error'     => null,
                'status'    => 200
            ]);
        }catch (\Exception $e){
            return response()->json([
                'data'      => null,
                'error'     => $e->getMessage(),
                'status'    => 400
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PutUpdateUser $request)
    {
        try {
            User::findOrFail($request->id)->update([
                'name' => $request->name,
                'phone' => $request->phone,
                'email' => $request->email,
                'company' => $request->company,
                'address' => $request->address,
                'latitude' => $request->latitude,
                'longitude' => $request->longitude,
            ]);

            return response()->json([
                'data'      => null,
                'error'     => null,
                'status'    => 200
            ]);
        }catch (\Exception $e){
            return response()->json([
                'data'      => null,
                'error'     => $e->getMessage(),
                'status'    => 400
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DeleteDestroyUser $request)
    {
        User::findOrFail($request->id)->delete();

        return response()->json([
            'data'      => null,
            'error'     => null,
            'status'    => 200
        ]);
    }
}
