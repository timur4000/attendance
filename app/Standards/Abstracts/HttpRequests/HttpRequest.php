<?php

namespace App\Standards\Abstracts\HttpRequests;

use App\Standards\Classifiers\Http\HttpContentTypesClassifier;
use App\Standards\Classifiers\HttpRequests\HttpRequestHeadersClassifier;
use App\Standards\Classifiers\HttpRequests\HttpRequestMethodsClassifier;
use App\Standards\Classifiers\HttpRequests\HttpRequestOptionsClassifier;
use App\Standards\Classifiers\HttpRequests\HttpRequestTokenTypesClassifier;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;

/**
 * Implements abstract logic for http requests.
 */
abstract class HttpRequest
{
    /**
     * Contains url to the request.
     *
     * @var string
     */
    private string $url;

    /**
     * Contains options to the request.
     *
     * @var Collection
     */
    private Collection $options;

    /**
     * Contains options to the request.
     *
     * @var Collection
     */
    private Collection $headers;

    /**
     * Contains queries to the request.
     *
     * @var Collection
     */
    private Collection $queries;

    /**
     * Contains username to the request.
     *
     * @var string
     */
    private string $username;

    /**
     * Contains password to the request.
     *
     * @var string
     */
    private string $password;

    /**
     * Contains token authorization to the request.
     *
     * @var string
     */
    private string $token;

    /**
     * Contains token authorization type to the request.
     *
     * @var HttpRequestTokenTypesClassifier
     */
    private HttpRequestTokenTypesClassifier $token_type;

    /**
     * Contains body to the request.
     *
     * @var array|object
     */
    private array | object $body = [];

    /**
     * Contains method to the request.
     *
     * @var HttpRequestMethodsClassifier
     */
    protected HttpRequestMethodsClassifier $method = HttpRequestMethodsClassifier::get;

    /**
     * Contains content type to the request.
     *
     * @var HttpContentTypesClassifier
     */
    protected HttpContentTypesClassifier $content_type = HttpContentTypesClassifier::JSON;

    /**
     * Contains timeout to the request.
     *
     * @var int
     */
    protected int $timeout = 10;

    /**
     * Contains verify to the request.
     *
     * @var bool
     */
    protected bool $is_verify = false;

    /**
     * Contains last response of the request.
     *
     * @var mixed
     */
    protected mixed $response;

    public function __construct()
    {
        $this->options = new Collection();

        $this->headers = new Collection();

        $this->queries = new Collection();

        $this->put_option(HttpRequestOptionsClassifier::verify, $this->is_verify);

        $this->put_option(HttpRequestOptionsClassifier::timeout, $this->timeout);
    }

    /**
     * Sets url to the request.
     *
     * @param string $value
     *
     * @return void
     */
    protected function set_url(string $value): void
    {
        $this->url = $value;
    }

    /**
     * Returns url of request.
     *
     * @return string
     */
    protected function get_url(): string
    {
        return $this->url;
    }

    /**
     * Executes request and returns response.
     *
     * @return mixed
     */
    public function execute(): mixed
    {
        $prepare = Http
            ::withOptions($this->options_to_array())
            ->withHeaders($this->headers_to_array())
            ->contentType($this->content_type->value)
            ->withQueryParameters($this->queries_to_array())
            ->withBody($this->body_to_json());

        if (!empty($this->username) && !empty($this->password))
        {
            $prepare = $prepare->withBasicAuth($this->username, $this->password);
        }

        if (!empty($this->token) && !empty($this->token_type))
        {
            $prepare = $prepare->withToken($this->token, $this->token_type->value);
        }

        $this->response = $prepare
            ->{ $this->method->name }($this->get_url())
            ->json();

        return $prepare;
    }

    /**
     * Adds the given option to the request.
     *
     * @param HttpRequestOptionsClassifier $classifier
     *
     * @param string $value
     *
     * @return void
     */
    protected function put_option(HttpRequestOptionsClassifier $classifier, mixed $value): void
    {
        $this
            ->options
            ->put($classifier->name, $value);
    }

    /**
     * Returns array from collection of options.
     *
     * @return array
     */
    protected function options_to_array(): array
    {
        return $this
            ->options
            ->toArray();
    }

    /**
     * Adds the given header to the request.
     *
     * @param HttpRequestHeadersClassifier $classifier
     *
     * @param string $value
     *
     * @return void
     */
    protected function put_header(HttpRequestHeadersClassifier $classifier, string $value): void
    {
        $this
            ->headers
            ->put($classifier->value, $value);
    }

    /**
     * Returns array from collection of headers.
     *
     * @return array
     */
    protected function headers_to_array(): array
    {
        return $this
            ->headers
            ->toArray();
    }

    /**
     * Adds the given query to the request.
     *
     * @param string $key
     *
     * @param string $value
     *
     * @return void
     */
    protected function put_query(string $key, string $value): void
    {
        $this
            ->queries
            ->put($key, $value);
    }

    /**
     * Returns array from collection of queries.
     *
     * @return array
     */
    protected function queries_to_array(): array
    {
        return $this
            ->queries
            ->toArray();
    }

    /**
     * Sets the given body to the request.
     *
     * @param array|object $value
     *
     * @return void
     */
    protected function set_body(array | object $value): void
    {
        $this->body = $value;
    }

    /**
     * Returns json of body.
     *
     * @return string
     */
    protected function body_to_json(): string
    {
        return json_encode($this->body);
    }

    /**
     * Sets username & password of basic auth to the request.
     *
     * @param string $username
     *
     * @param string $password
     *
     * @return void
     */
    protected function set_basic_auth(string $username, string $password): void
    {
        $this->username = $username;

        $this->password = $password;
    }

    /**
     * Sets given token with type of authorization to the request.
     *
     * @param string $token
     *
     * @param HttpRequestTokenTypesClassifier $classifier
     *
     * @return void
     */
    protected function set_token(string $token, HttpRequestTokenTypesClassifier $classifier = HttpRequestTokenTypesClassifier::BEARER): void
    {
        $this->token = $token;

        $this->token_type = $classifier;
    }

    /**
     * Returns response of the request.
     *
     * @return mixed
     */
    public function get_response(): mixed
    {
        return $this->response;
    }
}
