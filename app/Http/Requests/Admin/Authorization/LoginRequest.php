<?php

namespace App\Http\Requests\Admin\Authorization;

use Illuminate\Foundation\Http\FormRequest;

/**
 * Implements validate rules for login request.
 */
class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    static public function rules(): array
    {
        return [
            'login' => 'required|string',
            'password' => 'required',
            'is_remember' => 'nullable|bool',
        ];
    }
}
