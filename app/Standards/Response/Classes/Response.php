<?php

namespace App\Standards\Response\Classes;

use App\Managers\Reflections\ReflectionManager;
use App\Standards\ApiModels\Abstracts\ApiModel;
use App\Standards\Classifiers\Http\HttpCodesClassifier;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\MessageBag;
use ReflectionProperty;

/**
 * Implements logic for response.
 */
class Response
{
    /**
     * @var mixed
     */
    protected mixed $data = null;

    /**
     * @var int
     */
    protected int $total = 0;

    /**
     * @var array
     */
    protected array $query = [];

    /**
     * @var array
     */
    protected array $post = [];

    /**
     * @var array
     */
    protected array $json = [];

    /**
     * @var array
     */
    protected mixed $custom = [];

    /**
     * @var string
     */
    protected string $message = '';

    /**
     * @var HttpCodesClassifier
     */
    protected HttpCodesClassifier $status = HttpCodesClassifier::SUCCESS;

    /**
     * @var ApiModel|Model|null
     */
    protected null | ApiModel | Model $record = null;

    /**
     * @var MessageBag|null
     */
    protected ? MessageBag $errors = null;

    public function __construct()
    {
        $this->query = request()->query();

        $this->post = request()->post();

        $this->json = request()->json()->all();
    }

    public function json(): JsonResponse
    {
        return response()->json($this->properties_to_array());
    }

    /**
     * Returns new instance of Response class.
     *
     * @return $this
     */
    public static function get_instance(): static
    {
        return new Response();
    }

    /**
     * Returns reflection properties.
     *
     * @return ReflectionProperty[]
     */
    public function get_properties(): array
    {
        return ReflectionManager::properties(ReflectionManager::create($this));
    }

    /**
     * Converts properties to array.
     *
     * @return array
     */
    public function properties_to_array(): array
    {
        $array = [];

        foreach ($this->get_properties() as $property)
        {
            if (!isset($this->{ $property->getName() }))
            {
                continue ;
            }

            $array[ $property->getName() ] = $this->{ $property->getName() };
        }

        return $array;
    }

    /**
     * @return mixed
     */
    public function get_data(): mixed
    {
        return $this->data;
    }

    /**
     * @param mixed $data
     *
     * @return Response
     */
    public function set_data(mixed $data): static
    {
        $this->data = $data;

        return $this;
    }

    /**
     * @return int
     */
    public function get_total(): int
    {
        return $this->total;
    }

    /**
     * @param int $total
     *
     * @return Response
     */
    public function set_total(int $total): static
    {
        $this->total = $total;

        return $this;
    }

    /**
     * @return mixed
     */
    public function get_custom(): mixed
    {
        return $this->custom;
    }

    /**
     * @param mixed $custom
     *
     * @return Response
     */
    public function set_custom(mixed $custom): static
    {
        $this->custom = $custom;

        return $this;
    }

    /**
     * @return string
     */
    public function get_message(): string
    {
        return $this->message;
    }

    /**
     * @param string $message
     *
     * @return Response
     */
    public function set_message(string $message): static
    {
        $this->message = $message;

        return $this;
    }

    /**
     * @return HttpCodesClassifier
     */
    public function get_status(): HttpCodesClassifier
    {
        return $this->status;
    }

    /**
     * @param HttpCodesClassifier $status
     *
     * @return Response
     */
    public function set_status(HttpCodesClassifier $status): static
    {
        $this->status = $status;

        return $this;
    }

    /**
     * @return ApiModel|null
     */
    public function get_record(): ?ApiModel
    {
        return $this->record;
    }

    /**
     * @param ApiModel|Model|null $record
     *
     * @return Response
     */
    public function set_record(ApiModel | Model $record = null): static
    {
        $this->record = $record;

        return $this;
    }

    /**
     * @return MessageBag
     */
    public function get_errors(): MessageBag
    {
        return $this->errors;
    }

    /**
     * @param MessageBag $errors
     *
     * @return Response
     */
    public function set_errors(MessageBag $errors): static
    {
        $this->errors = $errors;

        return $this;
    }
}
