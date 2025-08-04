<div class="form-group form-group--size-default">

    <label for="{{ $element->get_id() }}" class="label label--size-default label--theme-jumbo">
        {!! $element->get_label() !!}
    </label>

    <select name="{{ $element->get_name() }}[]" id="{{ $element->get_id() }}" data-custom-select multiple>

        @forelse($element->get_options() as $key => $value)

            @if($element->has_relation_name())

                <option value="{{ $key }}" {{ get_is('selected', $element->check_old($key) || !empty($element->get_form()->get_record()?->{ $element->get_relation_name() }->find($key))) }}>{!! $value !!}</option>

            @else

                <option value="{{ $key }}" {{ get_is('selected', $element->check_old($key) || !empty($element->get_value()) && in_array($key, $element->get_value())) }}>{!! $value !!}</option>

            @endif

        @empty

        @endforelse

    </select>

    @error($element->get_name())

    <label for="{{ $element->get_id() }}" class="alert alert--size-default alert--theme-persian-rose">
        {{ $message }}
    </label>

    @enderror

</div>