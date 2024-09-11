<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Response;

class Cors
{
    public function handle($request, Closure $next)
    {
        /*return $next($request)
            ->header("Access-Control-Allow-Origin", "*")
            ->header("Access-Control-Allow-Methods", "*")
            ->header("Access-Control-Allow-Headers", "*")
            ->header('Access-Control-Allow-Credentials', 'true');*/
        $response = $next($request);

        if ($response instanceof  Response) {
            return $next($request)->header('Access-Control-Allow-Origin', '*')
                ->header('Access-Control-Allow-Methods', '*')
                ->header('Access-Control-Allow-Headers', '*,Authorization');
        }

        // If it is a real column \Symfony\Component\HttpFoundation\Response::class
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS,PATCH,DELETE,HEAD');
        $response->headers->set('Access-Control-Allow-Headers', 'x-csrf-token,x-requested-with,content-type,Authorization');
        return $response;
    }
}
