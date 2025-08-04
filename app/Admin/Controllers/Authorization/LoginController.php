<?php

namespace App\Admin\Controllers\Authorization;

use App\Admin\Controllers\BaseController;
use App\Handlers\Admin\Authorization\AuthorizationHandler;
use App\Http\Requests\Admin\Authorization\LoginRequest;
use App\Standards\ApiRequests\Classifiers\ApiRequestNumberClassifier;
use App\Standards\Classifiers\Sessions\SessionNamesClassifier;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

/**
 * Implements login action.
 */
class LoginController extends BaseController
{
    /**
     * Displaying view with form.
     *
     * @return View
     */
    static public function view(): View
    {
        return view(admin_directory('authorization.login'));
    }

    /**
     * Implements handle to the form request.
     *
     * @param Request $request
     *
     * @return RedirectResponse
     */
    static public function handle(Request $request): RedirectResponse
    {
        $validator = validator($request->all(), LoginRequest::rules());

        if ($validator->fails())
        {
            return redirect()
                ->back()
                ->withInput()
                ->withErrors($validator);
        }

        $response = AuthorizationHandler::access($request->post('login'), $request->post('password'));

        if ($response->number !== ApiRequestNumberClassifier::SUCCESS->value)
        {
            return redirect()
                ->back()
                ->withInput()
                ->with([ 'error' => $response->message ]);
        }

        $user = AuthorizationHandler::administrator();

        admin_authorization()->set_is_remember($request->post(SessionNamesClassifier::is_remember->name, false));

        if (admin_authorization()->login($user))
        {
            return redirect()->route(admin_home_route());
        }

        return redirect()->back();
    }
}
