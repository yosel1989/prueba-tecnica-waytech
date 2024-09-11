<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostCreateUser extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|max:150',
            'phone' => 'required|max:15',
            'email' => 'required|email|max:50',
            'company' => 'required|max:75',
            'address' => 'required|max:75',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'required' => 'Parametro :attribute es requerido',
            'max' => 'Parametro :attribute excede los :size caracteres',
            'email' => 'Parametro :attribute deber ser un correo',
            'number' => 'Parametro :attribute deber ser un númerico',
        ];
    }
}
