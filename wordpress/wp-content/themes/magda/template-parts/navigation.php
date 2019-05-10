<div class="menu-icon-container" id="menu-icon">
    <span class="bar"></span>
    <span class="bar"></span>
    <span class="bar"></span>
</div>

<?php
$args = array(
    'theme_location' => 'primary',
    'container_id' => 'menu-primary-id'
);
wp_nav_menu( $args );
?>
