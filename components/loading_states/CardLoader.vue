<template>
  <div>
    <b-card class="card-default">
      <b-row>
        <b-col xl="12" lg="12">
          <b-row>
            <b-col xl="2" lg="2">
              <div class="animated-round-image" />
            </b-col>
            <b-col xl="10" lg="10">
              <b-row class="mt-1">
                <b-col xl="10" lg="10" class="mt-1">
                  <div class="animated-text-label" />
                </b-col>
                <b-col xl="5" lg="5" class="mt-1">
                  <div class="animated-text-label" />
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-col>
        <b-col xl="7" lg="7" class="mt-3">
          <div class="animated-text-label" />
        </b-col>
        <b-col xl="8" lg="8" class="mt-1">
          <div class="animated-text-label" />
        </b-col>
        <b-col xl="7" lg="7" class="mt-3">
          <div class="animated-text-label" />
        </b-col>
        <b-col xl="12" lg="12" class="mt-1">
          <div class="animated-text-label" />
        </b-col>
        <b-col xl="12" lg="12" class="mt-3">
          <div class="animated-button" />
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>
<style>
    @keyframes placeHolderShimmer{
        0%{
            background-position: -468px 0
        }
        100%{
            background-position: 468px 0
        }
    }

    .animated-round-image {
        animation-duration: 2s;
        animation-fill-mode: forwards;
        animation-iteration-count: infinite;
        animation-name: placeHolderShimmer;
        animation-timing-function: linear;
        background: #f6f7f8;
        background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
        background-size: 800px 104px;
        height: 48px;
        width: 48px;
        border-radius: 48px;
        position: relative;
    }

    .animated-text-label {
        animation-duration: 2s;
        animation-fill-mode: forwards;
        animation-iteration-count: infinite;
        animation-name: placeHolderShimmer;
        animation-timing-function: linear;
        background: #f6f7f8;
        background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
        background-size: 800px 104px;
        height: 12px;
        position: relative;
    }

    .animated-button {
        animation-duration: 2s;
        animation-fill-mode: forwards;
        animation-iteration-count: infinite;
        animation-name: placeHolderShimmer;
        animation-timing-function: linear;
        background: #f6f7f8;
        background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
        background-size: 800px 104px;
        height: 28px;
        border-radius: 28px;
        position: relative;
    }

</style>
