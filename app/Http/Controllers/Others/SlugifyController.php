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
        $text = preg_replace('~[^\\pL\d.]+~u', '-', $text);

        // trim
        $text = trim($text, '-');
        setlocale(LC_CTYPE, 'en_GB.utf8');
        // transliterate
        if (function_exists('iconv')) {
            $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);
        }

        // lowercase
        $text = strtolower($text);
        // remove unwanted characters
        $text = preg_replace('~[^-\w.]+~', '', $text);
        if (empty($text)) {
            return 'empty_$';
        }
        if ($strict) {
            $text = str_replace(".", "_", $text);
        }
        return $text;
    }
}
