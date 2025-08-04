<?php

namespace App\Standards\Exports\Abstracts;

use App\Standards\Callables\Exports\ExportColumnsAccessCallable;
use App\Standards\Classifiers\Chars\CharsClassifiers;
use App\Standards\Exports\Classifiers\TableExportTypesClassifier;
use App\Standards\Exports\Classifiers\TablesExportVariablesClassifier;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

/**
 * Implements logic for everyone CollectionExport who perform export on tables.
 */
abstract class TablesCollectionExport extends CollectionExport
{
    /**
     * @var Request
     */
    protected Request $request;

    /**
     * @var TableExportTypesClassifier
     */
    protected TableExportTypesClassifier $type;

    /**
     * @var array
     */
    protected array $columns;

    /**
     * @param Request $request
     */
    public function __construct(Request $request)
    {
        if ($request->has(TablesExportVariablesClassifier::TYPE->value))
        {
            $this->type = TableExportTypesClassifier::from($request->get(TablesExportVariablesClassifier::TYPE->value));
        }

        if ($request->has(TablesExportVariablesClassifier::COLUMNS->value))
        {
            $this->columns = $this->convert_columns($request->get(TablesExportVariablesClassifier::COLUMNS->value));
        }

        $this->collection = $this->set_collection();
    }

    /**
     * @return Collection
     */
    public function collection(): Collection
    {
        return $this->collection_processing();
    }

    /**
     * Converts columns to array and returns it.
     *
     * @param string $columns
     *
     * @return array
     */
    protected function convert_columns(string $columns): array
    {
        return explode(CharsClassifiers::STRING_SEPARATOR, $columns);
    }

    /**
     * Implements process of the collection.
     *
     * @return Collection
     */
    protected function collection_processing(): Collection
    {
        if ($this->type === TableExportTypesClassifier::ALL_PROPERTIES)
        {
            return $this->collection;
        }

        return $this->collection->map(new ExportColumnsAccessCallable($this->columns));
    }
}
