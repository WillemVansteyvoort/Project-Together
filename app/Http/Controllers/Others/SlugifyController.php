<?php

namespace App\Http\Controllers;
namespace App\Http\Controllers\Others;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SlugifyController extends Controller
{
    public function slugify($text,$strict = false) {
        $text = html_entity_decode($text, ENT_QUOTES, 'UTF-8');
        // replace non letter or digits by -
        $text = preg_replace("/[^a-zA-Z0-9]/", "", $text);
        // trim
        $text = trim($text, '-');
        // lowercase
        $text = strtolower($text);
        // remove unwanted characters
        $text = preg_replace('~[^-\w.]+~', '', $text);
        return $text;
    }
}
