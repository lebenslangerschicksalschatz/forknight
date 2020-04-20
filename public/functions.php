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

add_action('rest_api_init', 'wp_rest_user_endpoints');
/**
 * Register a new user
 *
 * @param  WP_REST_Request $request Full details about the request.
 * @return array $args.
 **/
function wp_rest_user_endpoints($request) {
    /**
     * Handle Register User request.
     */
    register_rest_route('wp/v2', 'users/register', array(
        'methods' => 'POST',
        'callback' => 'wc_rest_user_endpoint_handler',
    ));
}
function wc_rest_user_endpoint_handler($request = null) {
    $response = array();
    $parameters = $request->get_json_params();
    $username = sanitize_text_field($parameters['username']);
    $email = sanitize_text_field($parameters['email']);
    $password = sanitize_text_field($parameters['password']);
    $error = new WP_Error();
    if (empty($username)) {
        $error->add(400, __("Username field 'username' is required.", 'wp-rest-user'), array('status' => 400));
        return $error;
    }
    if (empty($email)) {
        $error->add(401, __("Email field 'email' is required.", 'wp-rest-user'), array('status' => 400));
        return $error;
    }
    if (empty($password)) {
        $error->add(404, __("Password field 'password' is required.", 'wp-rest-user'), array('status' => 400));
        return $error;
    }
    $user_id = username_exists($username);
    if (!$user_id && email_exists($email) == false) {
        $user_id = wp_create_user($username, $password, $email);
        if (!is_wp_error($user_id)) {
            // Ger User Meta Data (Sensitive, Password included. DO NOT pass to front end.)
            $user = get_user_by('id', $user_id);
            // $user->set_role($role);
            $user->set_role('author');
            // Ger User Data (Non-Sensitive, Pass to front end.)
            $response['code'] = 200;
            $response['message'] = __("User '" . $username . "' Registration was Successful", "wp-rest-user");
        } else {
            return $user_id;
        }
    } else {
        $error->add(406, __("Email already exists, please try 'Reset Password'", 'wp-rest-user'), array('status' => 400));
        return $error;
    }
    return new WP_REST_Response($response, 123);
}