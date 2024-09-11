<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->render(function (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'data' => null,
                'error' => $e->validator->errors()->first(),
                'status' => Response::HTTP_BAD_REQUEST
            ], 200);
        });

        $exceptions->render(function (NotFoundHttpException $e) {
            return response()->json([
                'data' => null,
                'error' => 'No se encontro el registro',
                'status' => Response::HTTP_BAD_REQUEST
            ], 200);
        });
    })->create();
