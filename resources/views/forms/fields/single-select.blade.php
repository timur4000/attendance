<div class="form-group form-group--size-default">

    <label for="{{ $element->get_id() }}" class="label label--size-default label--theme-jumbo">
        {!! $element->get_label() !!}
    </label>

    <select name="{{ $element->get_name() }}" id="{{ $element->get_id() }}" data-custom-select data-with-label="0">

        @if($element->is_with_empty())
            
            <option value="">Nothing</option>
            
        @endif

        @forelse($element->get_options() as $key => $value)

            <option value="{{ $key }}" {{ get_is('selected', $key == $element->get_value()) }}>{{ $value }}</option>

        @empty
        @endforelse

    </select>

    @error($element->get_name())

    <label for="{{ $element->get_id() }}" class="alert alert--size-default alert--theme-persian-rose">
        {{ $message }}
    </label>

    @enderror

</div>