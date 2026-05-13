<?php
    $current_page = isset($_GET['page']) ? $_GET['page'] : '';
    $is_auth = ($current_page === 'controller_auth');

    if ($current_page === 'controller_home') {
        include("view/inc/top_page_home.html");
    } else if ($current_page === 'controller_shop') {
        include("view/inc/top_page_shop.html");
    } else if ($is_auth) {
        include("view/inc/top_page_auth.html");
    } else {
        include("view/inc/top_page_home.html");
    }

    @session_start();
?>

<?php if ($is_auth): ?>

    <?php include("view/inc/pages.php"); ?>

<?php else: ?>

<div id="wrapper">
    <div id="header">
        <?php include("view/inc/header.html"); ?>
    </div>
    <div id="menu">
        <?php include("view/inc/menu.html"); ?>
    </div>
    <div id="">
        <?php include("view/inc/pages.php"); ?>
        <br style="clear:both;" />
    </div>
    <div id="footer">
        <?php include("view/inc/footer.html"); ?>
    </div>
</div>

<?php endif; ?>

<?php include("view/inc/bottom_page.html"); ?>