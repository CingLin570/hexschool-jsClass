<template>
  <nav class="col-md-2 d-none d-md-block bg-light sidebar">
      <div class="sidebar-sticky">
        <h2 class="h3 mb-3"><i class="fas fa-user mr-2"></i>後台管理員</h2>
        <ul class="nav flex-column">
          <li class="nav-item">
            <router-link to="products" class="nav-link text-left"><i class="fas fa-tshirt mr-1"></i>後台產品列表</router-link>
          </li>
          <li class="nav-item">
            <router-link to="coupons" class="nav-link text-left"><i class="far fa-credit-card mr-1"></i>優惠卷</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link text-left" href="#">
              <i class="fas fa-images"></i>
              圖片頁面
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-left" href="#">
              <i class="far fa-list-alt"></i>
              訂單列表
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-left" href="#">
              <i class="fas fa-shopping-cart"></i>
              模擬下單
            </a>
          </li>
        </ul>
      </div>
    </nav>
</template>
