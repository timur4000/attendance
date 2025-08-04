<?php

namespace App\Standards\HttpRequests\Abstracts;

use App\Cache\HttpRequest\HttpRequestCache;
use App\Standards\Classifiers\Http\HttpContentTypesClassifier;
use App\Standards\HttpRequests\Classifiers\HttpRequestHeadersClassifier;
use App\Standards\HttpRequests\Classifiers\HttpRequestMethodsClassifier;
use App\Standards\HttpRequests\Classifiers\HttpRequestOptionsClassifier;
use App\Standards\HttpRequests\Classifiers\HttpRequestTokenTypesClassifier;
use Illuminate\Http\Client\PendingRequest;
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

    /**
     * Checks whether data needs to be cached.
     *
     * @var bool
     */
    protected bool $is_cache = false;

    /**
     * Contains instance of the HttpRequestCache class.
     *
     * @var HttpRequestCache
     */
    protected HttpRequestCache $cache;

    /**
     * Contains identifier of the cache.
     *
     * @var string
     */
    protected string $cache_identifier;

    /**
     * Contains time of execute.
     *
     * @var float
     */
    protected mixed $time_of_execute = 0;

    /**
     * Indicator of valid json.
     *
     * @var bool
     */
    protected bool $is_valid_json = false;

    /**
     *
     */
    public function __construct()
    {
        if ($this->is_cache)
        {
            $this->cache = new HttpRequestCache($this->cache_identifier);
        }

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
        if ($this->is_cache && $this->cache->has())
        {
            $this->response = $this->cache->get();

            return null;
        }

        $pending = $this->get_prepare();

        $time = microtime(true);

        $this->response = $pending
            ->{ $this->method->name }($this->get_url())
            ->body();

        $this->response_processing();

        if ($this->is_cache)
        {
            $this->cache->put($this->response);
        }

        $this->time_of_execute = microtime(true) - $time;

        return $pending;
    }

    /**
     * Implements process of the response.
     *
     * @return void
     */
    protected function response_processing(): void
    {
        $json = json_decode($this->response, true);

        $this->is_valid_json = json_last_error() === JSON_ERROR_NONE;

        $this->response = $this->is_valid_json ? $json : $this->response;
    }

    /**
     * Returns pending request.
     *
     * @return PendingRequest
     */
    private function get_prepare(): PendingRequest
    {
        $pending = Http
            ::withOptions($this->options_to_array())
            ->withUserAgent(config('requests.user_agent'))
            ->withHeaders($this->headers_to_array())
            ->contentType($this->content_type->value)
            ->withQueryParameters($this->queries_to_array())
            ->withBody($this->body_to_json());

        if (!empty($this->username) && !empty($this->password))
        {
            $pending = $pending->withBasicAuth($this->username, $this->password);
        }

        if (!empty($this->token) && !empty($this->token_type))
        {
            $pending = $pending->withToken($this->token, $this->token_type->value);
        }

        return $pending;
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
        return json_encode($this->body, JSON_HEX_QUOT | JSON_HEX_APOS);
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

    /**
     * Returns time of execute.
     *
     * @return float
     */
    public function get_time_of_execute(): float
    {
        return $this->time_of_execute;
    }
}
