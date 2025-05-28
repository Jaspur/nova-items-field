<?php

namespace NovaItemsField;

use Laravel\Nova\Nova;
use Laravel\Nova\Events\ServingNova;
use Illuminate\Support\ServiceProvider;

final class FieldServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        // Bind the compiled JS for Nova
        Nova::serving(function (ServingNova $event): void {
            Nova::script('nova-items-field', __DIR__ . '/../dist/field.js');
        });

        // Optional asset publishing (e.g., for public use)
        $this->publishes([
            __DIR__ . '/../dist' => public_path('vendor/nova-items-field'),
        ], 'nova-items-field-assets');
    }

    public function register(): void
    {
        //
    }
}
