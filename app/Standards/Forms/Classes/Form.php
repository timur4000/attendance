<?php

namespace App\Standards\Forms\Classes;

use App\Standards\Classifiers\Http\HttpMethodsClassifiers;
use App\Standards\Elements\Abstracts\Element;
use App\Standards\Elements\Classifiers\AttributesClassifier;
use App\Standards\Elements\Classifiers\TagsClassifier;
use App\Standards\Elements\Classifiers\ViewsClassifier;
use App\Standards\Fields\Abstracts\Field;
use App\Standards\Fields\Classes\Button;
use App\Standards\Fields\Classes\Checkbox;
use App\Standards\Fields\Classes\Date;
use App\Standards\Fields\Classes\DateTime;
use App\Standards\Fields\Classes\Hidden;
use App\Standards\Fields\Classes\MultipleSelect;
use App\Standards\Fields\Classes\Number;
use App\Standards\Fields\Classes\SingleSelect;
use App\Standards\Fields\Classes\Text;
use App\Standards\Fields\Classes\TextArea;
use App\Standards\Fields\Traits\FieldName;
use App\Standards\Forms\Callables\RulesCreatingMapCallable;
use App\Standards\Handlers\Interfaces\IGetting;
use App\Standards\RouteGroups\Abstracts\RouteGroup;
use App\Standards\RouteRequests\Abstracts\RouteRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;

/**
 * Implements logic for forms.
 */
class Form extends Element
{
    use FieldName;

    /**
     * @var IGetting
     */
    protected IGetting $handler;

    /**
     * @var object|null
     */
    protected ? object $record = null;

    /**
     * @var string
     */
    protected string $action;

    /**
     * @var HttpMethodsClassifiers
     */
    protected HttpMethodsClassifiers $method;

    /**
     * @var string
     */
    protected string $identifier_name = 'id';

    /**
     * @var string
     */
    protected string $identifier_rules;

    /**
     * @var Collection<Field>
     */
    protected Collection $fields;

    public function __construct()
    {
        parent::__construct();

        $this->fields = new Collection();

        $this->view = ViewsClassifier::form;

        $this->tag = TagsClassifier::form;
    }

    /**
     * @inheritdoc
     *
     * @return static
     */
    public function initialization(): static
    {
        $this->edit_processing();

        $this->rules_processing();

        $this->add_attribute(AttributesClassifier::ID, $this->get_id());

        $this->add_attribute(AttributesClassifier::ACTION, $this->get_action());

        $this->add_attribute(AttributesClassifier::METHOD, $this->get_method());

        $this->add_attribute(AttributesClassifier::NAME, $this->get_name());

        return $this;
    }

    /**
     * Implements processing at editing.
     *
     * @return void
     */
    protected function edit_processing(): void
    {
        if (!$this->record)
        {
            return;
        }

        $this->hidden($this->identifier_name, $this->record->{ $this->identifier_name });
    }

    /**
     * Implements processing at rules.
     *
     * @return void
     */
    protected function rules_processing(): void
    {
        session()->flash($this->get_identifier_rules(), $this->create_rules());
    }

    /**
     * Implements initialize Hidden field.
     *
     * @param string $name
     *
     * @param string $value
     *
     * @return Hidden
     */
    public function hidden(string $name, string $value): Hidden
    {
        $instance = new Hidden($name, $value);

        $instance->form($this);

        $this->fields->push($instance);

        $this->append_child($instance);

        return $instance;
    }

    /**
     * Implements initialize Text field.
     *
     * @param string $name
     *
     * @param string $label
     *
     * @return Text
     */
    public function text(string $name, string $label): Text
    {
        $instance = new Text($name, $label);

        $instance->form($this);

        $this->fields->push($instance);

        $this->append_child($instance);

        return $instance;
    }

    /**
     * Implements initialize Date field.
     *
     * @param string $name
     *
     * @param string $label
     *
     * @return Date
     */
    public function date(string $name, string $label): Date
    {
        $instance = new Date($name, $label);

        $instance->form($this);

        $this->fields->push($instance);

        $this->append_child($instance);

        return $instance;
    }

    /**
     * Implements initialize DateTime field.
     *
     * @param string $name
     *
     * @param string $label
     *
     * @return DateTime
     */
    public function date_time(string $name, string $label): DateTime
    {
        $instance = new DateTime($name, $label);

        $instance->form($this);

        $this->fields->push($instance);

        $this->append_child($instance);

        return $instance;
    }

    /**
     * Implements initialize Number field.
     *
     * @param string $name
     *
     * @param string $label
     *
     * @return Number
     */
    public function number(string $name, string $label): Number
    {
        $instance = new Number($name, $label);

        $instance->form($this);

        $this->fields->push($instance);

        $this->append_child($instance);

        return $instance;
    }

    /**
     * Implements initialize Checkbox field.
     *
     * @param string $name
     *
     * @param string $label
     *
     * @return Checkbox
     */
    public function checkbox(string $name, string $label): Checkbox
    {
        $instance = new Checkbox($name, $label);

        $instance->form($this);

        $this->fields->push($instance);

        $this->append_child($instance);

        return $instance;
    }

    /**
     * Implements initialize boolean Checkbox field.
     *
     * @param string $name
     *
     * @param string $label
     *
     * @return Checkbox
     */
    public function boolean(string $name, string $label): Checkbox
    {
        $instance = new Checkbox($name, $label);

        $instance->set_default_value(1);

        $instance->form($this);

        $this->hidden($name, 0);

        $this->fields->push($instance);

        $this->append_child($instance);

        return $instance;
    }

    /**
     * Implements initialize Text field.
     *
     * @param string $name
     *
     * @param string $label
     *
     * @return TextArea
     */
    public function textarea(string $name, string $label): TextArea
    {
        $instance = new TextArea($name, $label);

        $instance->form($this);

        $this->fields->push($instance);

        $this->append_child($instance);

        return $instance;
    }

    /**
     * Implements initialize SingleSelect field.
     *
     * @param string $name
     *
     * @param string $label
     *
     * @return SingleSelect
     */
    public function single_select(string $name, string $label): SingleSelect
    {
        $instance = new SingleSelect($name, $label);

        $instance->form($this);

        $this->fields->push($instance);

        $this->append_child($instance);

        return $instance;
    }

    /**
     * Implements initialize MultipleSelect field.
     *
     * @param string $name
     *
     * @param string $label
     *
     * @return MultipleSelect
     */
    public function multiple_select(string $name, string $label): MultipleSelect
    {
        $instance = new MultipleSelect($name, $label);

        $instance->form($this);

        $this->hidden($name, '');

        $this->fields->push($instance);

        $this->append_child($instance);

        return $instance;
    }

    /**
     * Implements initialize Button field.
     *
     * @param string $name
     *
     * @param string $label
     *
     * @return Button
     */
    public function button(string $name, string $label): Button
    {
        $instance = new Button($name, $label);

        $this->append_child($instance);

        return $instance;
    }

    /**
     * Checks if the form is an editing stage.
     *
     * @return bool
     */
    public function is_editing(): bool
    {
        return (bool) $this->record;
    }

    /**
     * Sets handler property.
     *
     * @param IGetting $value
     *
     * @param int|null $id
     *
     * @return $this
     */
    public function handler(IGetting $value, ? int $id = null): static
    {
        $this->handler = $value;

        $this->record = $this->handler->get($id);

        return $this;
    }

    /**
     * Returns record property.
     *
     * @return object|null
     */
    public function get_record(): object | null
    {
        return $this->record;
    }

    /**
     * @param object|null $record
     *
     * @return Form
     */
    public function set_record(? object $record): static
    {
        $this->record = $record;

        return $this;
    }

    /**
     * Sets action property by RouteRequest class.
     *
     * @param RouteRequest|string $value
     *
     * @return $this
     */
    public function action_by_route_request(RouteRequest | string $value): static
    {
        $this->action = RouteGroup::get_route($value);

        return $this;
    }

    /**
     * Sets action property.
     *
     * @param string $value
     *
     * @return $this
     */
    public function action(string $value): static
    {
        $this->action = $value;

        return $this;
    }

    /**
     * Returns action property.
     *
     * @return string
     */
    public function get_action(): string
    {
        return $this->action;
    }

    /**
     * Sets method property.
     *
     * @param HttpMethodsClassifiers $value
     *
     * @return $this
     */
    public function method(HttpMethodsClassifiers $value): static
    {
        $this->method = $value;

        return $this;
    }

    /**
     * Returns method property.
     *
     * @return string
     */
    public function get_method(): string
    {
        return $this->method->name;
    }

    /**
     * Returns validator.
     *
     * @param Request $request
     *
     * @param string $identifier
     *
     * @return Validator
     *
     * @throws ContainerExceptionInterface
     *
     * @throws NotFoundExceptionInterface
     */
    public static function get_validator(Request $request, string $identifier): Validator
    {
        return validator($request->all(), Form::get_rules($identifier));
    }

    /**
     * Returns rules from session.
     *
     * @param string $identifier
     *
     * @return array
     *
     * @throws ContainerExceptionInterface
     *
     * @throws NotFoundExceptionInterface
     */
    public static function get_rules(string $identifier): array
    {
        return session()->get($identifier) ?? [];
    }

    /**
     * Returns method property.
     *
     * @return array
     */
    public function create_rules(): array
    {
        return $this
            ->fields
            ->mapWithKeys(new RulesCreatingMapCallable())->toArray();
    }

    /**
     * @return string
     */
    public function get_identifier_name(): string
    {
        return $this->identifier_name;
    }

    /**
     * @param string $identifier_name
     *
     * @return Form
     */
    public function set_identifier_name(string $identifier_name): static
    {
        $this->identifier_name = $identifier_name;

        return $this;
    }

    /**
     * @return string
     */
    public function get_identifier_rules(): string
    {
        return $this->identifier_rules ?? $this->get_id();
    }

    /**
     * @param string $identifier_rules
     *
     * @return Form
     */
    public function set_identifier_rules(string $identifier_rules): static
    {
        $this->identifier_rules = $identifier_rules;

        return $this;
    }

    /**
     * @inheritdoc
     *
     * @return string
     */
    public function render(): string
    {
        return view($this->view->value)
            ->with($this->to_with())
            ->render();
    }
}
