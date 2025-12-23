var searchResultItem = `<div class="col-md-6">
                  <div class="shadow-sm contact-item">
                    <div class="px-3 pt-3 pb-2 bg-white">
                      <!--^ contact-item__header -->
                      <div
                        class="contact-item__header d-flex align-items-center gap-3"
                      >
                        <div
                          class="contact-item__header-icon position-relative text-white d-flex justify-content-center align-items-center"
                        >
                          <span class="fs-5 fw-bold">D</span>
                          <!--^ favorite icon shown when added to favorite -->
                          <div
                            class="icon-badge border border-2 border-white position-absolute star-position rounded-circle bg-amber-400 d-flex justify-content-center align-items-center"
                          >
                            <i class="fa-solid fa-star text-white fa-2xs"></i>
                          </div>
                          <!--^ emergency icon shown when added to emergency -->
                          <div
                            class="icon-badge border border-2 border-white position-absolute heart-position rounded-circle bg-rose-500 d-flex justify-content-center align-items-center"
                          >
                            <i
                              class="fa-solid fa-heart-pulse text-white fa-2xs"
                            ></i>
                          </div>
                        </div>
                        <div class="contact-item__header-info">
                          <span class="fw-bold truncate-ch">david</span>
                          <div
                            class="mt-1 d-flex flex-nowrap align-items-center gap-2"
                          >
                            <div
                              class="call-icon d-flex justify-content-center align-items-center"
                            >
                              <i
                                class="fa-solid fa-phone fa-2xs text-blue-600"
                              ></i>
                            </div>
                            <span class="text-gray-500 truncate-ch"
                              >01283288546
                            </span>
                          </div>
                        </div>
                      </div>
                      <!--^ contact-item__body -->
                      <div class="contact-item__body mt-3">
                        <!-- email -->
                        <div class="d-flex align-items-center gap-2 mb-2">
                          <div
                            class="email size d-flex justify-content-center align-items-center"
                          >
                            <i
                              class="fa-solid fa-envelope fa-xs text-violet-600"
                            ></i>
                          </div>
                          <span class="text-gray-600 truncate-ch"
                            >davidsamir@gmail.com</span
                          >
                        </div>
                        <!-- address -->
                        <div class="d-flex align-items-center gap-2">
                          <div
                            class="address size d-flex justify-content-center align-items-center"
                          >
                            <i
                              class="fa-solid fa-location-dot fa-xs text-emerald-600"
                            ></i>
                          </div>
                          <span class="text-gray-600 truncate-ch"
                            >wefewggggggggggwrgrehtrhyr5jergegeefewfwaef</span
                          >
                        </div>
                        <div class="mt-3">
                          <span
                            class="me-1 d-inline-block py-1 fs-12px fw-semibold px-2 rounded-3 bg-amber-100 text-amber-700"
                          >
                            school
                          </span>
                          <span
                            class="d-inline-block py-1 text-rose-600 fs-12px fw-semibold px-2 rounded-3 bg-rose-50"
                          >
                            <i class="fa-solid fa-heart-pulse fa-sm"></i>
                            <span>Emergency</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <!--^ contact-item__footer -->
                    <div
                      class="contact-item__footer d-flex justify-content-between"
                    >
                      <!--^ call number or send email -->
                      <div class="d-flex gap-2">
                        <!-- call number  -->

                        <a
                          href="tel"
                          class="text-decoration-none call-number footer__icon bg-emerald-50 d-flex justify-content-center align-items-center"
                        >
                          <i class="fa-solid fa-phone text-emerald-600"></i>
                        </a>

                        <!-- send email  -->
                        <a
                          href="mailto"
                          class="text-decoration-none footer__icon send-email text-violet-600 bg-violet-50 d-flex justify-content-center align-items-center"
                        >
                          <i class="fa-solid fa-envelope"></i>
                        </a>
                      </div>
                      <!--^ edit -->
                      <div class="edit">
                        <div class="d-flex gap-2">
                          <!-- add-to-favorite -->
                          <button
                            class="add-to-favorite text-gray-400 bg-gray-50 border-0 footer__icon d-flex justify-content-center align-items-center"
                          >
                            <i class="fa-regular fa-star"></i>
                          </button>
                          <!-- add-to-emergency -->
                          <button
                            class="add-to-emergency text-gray-400 bg-gray-50 border-0 footer__icon d-flex justify-content-center align-items-center"
                          >
                            <i class="fa-regular fa-heart"></i>
                          </button>
                          <!-- edit-contact -->
                          <button
                            class="edit-contact text-gray-400 bg-gray-50 border-0 footer__icon d-flex justify-content-center align-items-center"
                          >
                            <i class="fa-solid fa-pen"></i>
                          </button>
                          <!-- delete -->
                          <button
                            class="delete-contact text-gray-400 bg-gray-50 border-0 footer__icon d-flex justify-content-center align-items-center"
                          >
                            <i class="fa-solid fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>`;

var addToFavoriteItem = ` <!-- favorite-item -->
                    <div class="col-12 col-md-6 col-xl-12">
                      <a
                        href="tel"
                        class="favorite-item p-2 border rounded-12px text-decoration-none d-flex justify-content-between align-items-center"
                      >
                        <!-- left side  -->
                        <div class="d-flex align-items-center gap-1">
                          <div
                            class="sidebar-item__info bg-blue-600 small fw-bold text-white d-flex justify-content-center align-items-center"
                          >
                            P
                          </div>
                          <div class="">
                            <span
                              class="text-gray-900 fs-12px d-block fw-semibold"
                              >peter</span
                            >
                            <span class="fs-10px text-gray-400 d-block"
                              >01289296507</span
                            >
                          </div>
                        </div>
                         <!-- right side  -->
                        <div
                          class="sidebar-call-icon text-emerald-600 bg-emerald-100 d-flex justify-content-center align-items-center"
                        >
                          <i class="fa-solid fa-phone fa-2xs"></i>
                        </div>
                      </a>
                    </div>`;

var addToemergencyItem = `<!-- emergency-item -->
                    <div class="col-12 col-md-6 col-xl-12">
                      <a
                        href="tel"
                        class="emergency-item p-2 border rounded-12px text-decoration-none d-flex justify-content-between align-items-center"
                      >
                        <!-- left side  -->
                        <div class="d-flex align-items-center gap-1">
                          <div
                            class="sidebar-item__info bg-blue-600 small fw-bold text-white d-flex justify-content-center align-items-center"
                          >
                            P
                          </div>
                          <div class="">
                            <span
                              class="text-gray-900 fs-12px d-block fw-semibold"
                              >peter</span
                            >
                            <span class="fs-10px text-gray-400 d-block"
                              >01289296507</span
                            >
                          </div>
                        </div>
                        <!-- right side  -->
                        <div
                          class="sidebar-call-icon text-emerald-600 bg-emerald-100 d-flex justify-content-center align-items-center"
                        >
                          <i class="fa-solid fa-phone fa-2xs"></i>
                        </div>
                      </a>
                    </div>`;

// addToFavoriteItem and addToemergencyItem almost same except first comment and
// classes  favorite-item in favorite while emergency-item in emergency
