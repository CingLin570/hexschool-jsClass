<template>
  <nav class="col-md-2 d-none d-md-block bg-light sidebar navbar navbar-expand-lg navbar-light">
    <div class="sidebar-sticky">
      <h2 class="h3 mb-5">
        <i class="fas fa-user mr-2"></i>後台管理員
      </h2>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav flex-column">
          <li class="nav-item">
            <router-link to="products" class="nav-link text-left">
              <i class="fas fa-tshirt mr-1"></i>後台產品列表
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="coupons" class="nav-link text-left">
              <i class="far fa-credit-card mr-1"></i>優惠卷
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="storages" class="nav-link text-left">
              <i class="fas fa-images mr-1"></i>圖片頁面
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="detail" class="nav-link text-left">
              <i class="fas fa-list-alt mr-1"></i>客戶訂單列表
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="order" class="nav-link text-left">
              <i class="fas fa-shopping-cart mr-1"></i>
              模擬下單
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
