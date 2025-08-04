<div class="input-outer input-outer--theme-mercury input-outer--size-middle input-outer--type-default">

    <label for="{{ $data['input_name'] }}" class="input-outer__label input-outer__label--size-middle input-outer__label--theme">
        {!! svg($data['icon_id'], [ 'class' => 'icon icon-size-16' ]) !!}
    </label>

    <input type="{{ $data['input_type'] }}" name="{{ $data['input_name'] }}" value="{{ old($data['input_name']) }}" class="input input--theme input--size-middle input-outer__input" placeholder="{{ $data['input_placeholder'] }}" autocomplete="{{ get_is([ 'off', 'on' ], $data['autocomplete']) }}" id="{{ $data['input_name'] }}">

</div>

@error($data['input_name'])

<label for="{{ $data['input_name'] }}" class="alert alert--size-default alert--theme-persian-rose">
    {{ $message }}
</label>

@enderror