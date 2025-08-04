<div class="input-outer input-outer--theme-mercury input-outer--size-middle input-outer--type-label input-outer--type-line" data-input-date>

    <div class="custom-input" data-custom-input-hover>
        <input type="{{ $data['input_type'] }}" name="{{ $data['input_name'] }}" value="{{ old($data['input_name']) }}" data-max-date="{{ $data['max_date'] }}" class="input input--theme input--size-middle input-outer__input custom-input__input" placeholder=" " id="{{ $data['input_name'] }}">

        <label for="{{ $data['input_name'] }}" class="custom-input__float-label custom-input__float-label--type-hide custom-input__float-label--theme-jumbo">
            {{ $data['input_placeholder'] }}
        </label>
    </div>

    <label for="{{ $data['input_name'] }}" class="input-outer__label input-outer__label--size-middle input-outer__label--theme">
        {!! svg($data['icon_id'], [ 'class' => 'icon icon-size-16' ]) !!}
    </label>

</div>

@if($data['with_error'])
    @error($data['input_name'])

    <label for="{{ $data['input_name'] }}" class="alert alert--size-default alert--theme-persian-rose">
        {{ $message }}
    </label>

    @enderror
@endif