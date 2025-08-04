<?php

namespace App\Admin\Controllers\AbsencesController;

use App\Admin\Controllers\BaseController;
use App\ApiRequestSettings\Data\Absences\AbsencesInsertApiRequestSettings;
use App\Handlers\Admin\Absences\AbsencesHandler;
use App\Handlers\Admin\Classifiers\AbsencesClassifierHandler;
use App\RoutesRequests\Admin\Absences\AbsencesPatchPostRouteRequest;
use App\Standards\Classifiers\Date\DateFormatsClassifier;
use App\Standards\Classifiers\Http\HttpMethodsClassifiers;
use App\Standards\Forms\Classes\Form;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Implements logic action of the absences groups.
 */
class AbsencesController extends BaseController
{
    /**
     * Returns form.
     *
     * @param int $id_user
     *
     * @return Form
     */
    public static function get_form(int $id_user): Form
    {
        $form = (new Form())
            ->set_id('absences-create')
            ->action_by_route_request(AbsencesPatchPostRouteRequest::class)
            ->method(HttpMethodsClassifiers::POST);

        $form
            ->single_select('id_absence', 'Id absence')
            ->options(AbsencesClassifierHandler::instance(), 'id_object', 'name_object');

        $form
            ->date_time('date_start', 'Date start')
            ->set_selected_date(date(DateFormatsClassifier::Y_m_d_H_i_s->value))
            ->set_min_date(date(DateFormatsClassifier::Y_m_d_H_i_s->value))
            ->set_rules('required|date');

        $form
            ->date_time('date_end', 'Date end')
            ->set_selected_date(date(DateFormatsClassifier::Y_m_d_H_i_s->value, strtotime('+1 day')))
            ->set_min_date(date(DateFormatsClassifier::Y_m_d_H_i_s->value, strtotime('+1 day')))
            ->set_rules('required|date');

        $form
            ->textarea('note_absence', 'Note')
            ->set_rows(3)
            ->set_rules('required|string');

        $form
            ->hidden('id_user', $id_user)
            ->set_rules('required|numeric');

        $form->initialization();

        return $form;
    }

    /**
     * Creates or updates record.
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function patch(Request $request): JsonResponse
    {
        $validator = validator($request->all(), self::get_form($request->post('id_user'))->create_rules());

        if ($validator->fails())
        {
            return response()->json([ 'errors' => $validator->errors() ]);
        }

        $settings = new AbsencesInsertApiRequestSettings();

        $settings->update($request->post());

        $record = AbsencesHandler::create($settings);

        return response()->json([ 'message' => 'Success', 'record' => $record ]);
    }

    /**
     * Creates record.
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function delete(Request $request): JsonResponse
    {
        $validator = validator($request->json()->all(), [ 'id_row' => 'required' ]);

        if ($validator->fails())
        {
            return response()->json([ 'errors' => $validator->errors() ]);
        }

        $record = AbsencesHandler::delete($request->json('id_row'));

        return response()->json([ 'message' => 'Success', 'record' => $record ]);
    }

    /**
     * Returns json of records.
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function records_json(Request $request): JsonResponse
    {
        $records = AbsencesHandler::records($request->json('id_user'));

        return response()->json(
            [
                'data' => $records,
            ]
        );
    }
}
