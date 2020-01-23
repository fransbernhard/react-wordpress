<?php

    // Remove auto added p tags from content
    remove_filter( "the_content", "wpautop" );

    function my_theme_enqueue_scripts(){
        wp_enqueue_style( "hip-style", get_template_directory_uri() . "/dist/style.min.css" );
        wp_enqueue_script("bundle", get_stylesheet_directory_uri() . "/dist/script.min.js", array("jquery"), 1, true );
    }
    add_action("wp_enqueue_scripts", "my_theme_enqueue_scripts");

    // Register Menu
    function register_my_menus() {
        register_nav_menus(array(
            "primary" => __( "Primary Menu" ),
            "secondary" => __("Secondary Menu")
        ));
    }
    add_action("after_setup_theme", "register_my_menus");

    // Add thumbnail photo
    add_theme_support( "post-thumbnails" );

    // Set unlimited posts
    function wpsites_no_limit_posts( $query ) {
        if( $query->is_main_query() && !is_admin() && is_home() ) {
            $query->set( "posts_per_page", "-1" );
            $query->set( "order", "ASC" );
            $query->set( "post_type", "post" );
            $query->set( "orderby", "name" );
            $query->set( "order", "ASC" );
            $query->set( "hide_empty", "1" );
            $query->set( "depth", "1" );
        }
    }
    add_action( "pre_get_posts", "wpsites_no_limit_posts" );

    // Register post type
    function create_post_type(){
        $labels = [
            "name" => __("Places"),
            "singular_name" => __("Places"),
            "add_new" => "Add Place"
        ];
        $args = [
            "supports" => ["title", "editor", "thumbnail", "author"],
            "show_in_rest" => true,
            "labels" => $labels,
            "public" => true,
            "has_archive" => false,
            "taxonomies" => ["category"]
        ];
        register_post_type("places", $args);
    }
    add_action("init", "create_post_type");

    // Register featured image
    function register_rest_images(){
        register_rest_field( ["post", "places"],
            "fimg_url",
            [
                "get_callback" => "get_rest_featured_image",
                "update_callback" => null,
                "schema" => null
            ]
        );
    }
    function get_rest_featured_image( $object, $field_name, $request ) {
        if( $object["featured_media"] ){
            $img = wp_get_attachment_image_src( $object["featured_media"], "app-thumb" );
            return $img[0];
        }
        return false;
    }
    add_action("rest_api_init", "register_rest_images" );


 
