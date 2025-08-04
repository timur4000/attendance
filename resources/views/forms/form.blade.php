<form class="form" {!! $element->get_attributes() !!}>

    <h3 class="form__alert alert alert--size-default alert--theme-persian-rose inactive" data-form-error></h3>

    @forelse($element->get_children() as $child)

        {!! $child->initialization()->render() !!}

    @empty

    @endforelse

    @csrf

</form>