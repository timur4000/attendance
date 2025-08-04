<?php

namespace App\Standards\Exports\Abstracts;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStrictNullComparison;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

/**
 * Implements base abstract logic for the all collection export classes.
 */
abstract class CollectionExport implements FromCollection, WithStyles, WithHeadings, ShouldAutoSize, WithStrictNullComparison
{
    /**
     * @var Collection
     */
    protected Collection $collection;

    /**
     * @return Collection
     */
    abstract public function collection(): Collection;

    /**
     * @return Collection
     */
    abstract protected function set_collection(): Collection;

    /**
     * @param Worksheet $sheet
     *
     * @return void
     */
    public function styles(Worksheet $sheet): void
    {
//        $sheet->getRowDimension(1)->setRowHeight(30);
    }

    /**
     * @return array
     */
    public function headings(): array
    {
        return array_keys(((array) $this->collection()->first()));
    }
}
