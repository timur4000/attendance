<div class="form-group form-group--size-default">

    <label for="{{ $element->get_id() }}" class="label label--size-default label--theme-jumbo">
        {!! $element->get_label() !!}
    </label>

    <textarea name="{{ $element->get_name() }}" id="{{ $element->get_id() }}" {!! $element->get_attributes() !!} class="input input--theme-mercury input--type-textarea input--size-middle input-outer__input custom-input__input" placeholder="{!! $element->get_placeholder() !!}">{{ $element->get_value() }}</textarea>

    <label for="{{ $element->get_id() }}" class="alert alert--size-default alert--theme-persian-rose {{ get_is('inactive', !$errors->has($element->get_name())) }}" data-error-label>
        @error($element->get_name()) {{ $message }} @enderror
    </label>

</div>