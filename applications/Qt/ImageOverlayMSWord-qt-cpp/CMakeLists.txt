cmake_minimum_required(VERSION 3.20)
project(WordOverlay LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Set to your Qt version if needed
set(CMAKE_PREFIX_PATH "C:/Qt/6.9.2/mingw_64")
find_package(Qt6 REQUIRED COMPONENTS Widgets)

set(CMAKE_AUTOMOC ON)   
add_executable(WordOverlay
    src/main.cpp
)

target_compile_features(WordOverlay PRIVATE cxx_std_17)

# Qt & Win32 libs
target_link_libraries(WordOverlay PRIVATE
    Qt6::Widgets
    user32
    gdi32
    dwmapi
    shcore
)

if (WIN32) # Only run the following on Windows builds.
  add_custom_command(TARGET WordOverlay POST_BUILD # Attach a command to the hello_qt target that runs after the target is built.
    # Run Qt’s windeployqt tool to copy all required Qt DLLs/plugins beside the built exe.
    COMMAND "${CMAKE_PREFIX_PATH}/bin/windeployqt.exe" --release "$<TARGET_FILE:WordOverlay>"  
    VERBATIM) # Tell CMake not to reinterpret/escape arguments—pass them exactly as written.

  # For MinGW: copy runtime DLLs
  if (CMAKE_CXX_COMPILER_ID STREQUAL "GNU") # Guard: only do this when compiling with GCC/MinGW (not MSVC).
    add_custom_command(TARGET WordOverlay POST_BUILD # Another post-build step on the same target.
        # Use CMake’s built-in command runner to copy files only if they differ (avoids needless writes).
      COMMAND ${CMAKE_COMMAND} -E copy_if_different 
        "C:/Qt/Tools/mingw1310_64/bin/libstdc++-6.dll"
        "C:/Qt/Tools/mingw1310_64/bin/libgcc_s_seh-1.dll"
        "C:/Qt/Tools/mingw1310_64/bin/libwinpthread-1.dll"
        "$<TARGET_FILE_DIR:WordOverlay>") # Destination folder = the directory that contains the built exe.
  endif()
endif()