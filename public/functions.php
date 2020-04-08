<?php
// Add various fields to the JSON output
function forknight_register_fields() {
    // Add Author Name
    register_rest_field( 'post',
        'author_name',
        array(
            'get_callback'      => 'forknight_get_author_name',
            'update_callback'   => null,
            'schema'            => null
        )
    );
    // Add Featured Image
    register_rest_field( 'post',
        'featured_image_src',
        array(
            'get_callback'      => 'forknight_get_image_src',
            'update_callback'   => null,
            'schema'            => null
        )
    );
    // Add Published Date
    register_rest_field( 'post',
       'published_date',
       array(
           'get_callback'      => 'forknight_published_date',
           'update_callback'   => null,
           'schema'            => null
       )
    );
}
add_action( 'rest_api_init', 'forknight_register_fields' );

function forknight_get_author_name( $object, $field_name, $request ) {
    return get_the_author_meta( 'display_name' );
}
function forknight_get_image_src( $object, $field_name, $request ) {
   if($object[ 'featured_media' ] == 0) {
       return $object[ 'featured_media' ];
   }
    $feat_img_array = wp_get_attachment_image_src( $object[ 'featured_media' ], 'full', true );
   return $feat_img_array[0];
}
function forknight_published_date( $object, $field_name, $request ) {
    return get_the_time('F j, Y');
}