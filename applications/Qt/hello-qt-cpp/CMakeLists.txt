cmake_minimum_required(VERSION 3.21)
project(hello_qt LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Point CMake to your Qt if it can't find it automatically:
# tells CMake extra places to look when trying to find packages (find_package, find_library, etc.).
set(CMAKE_PREFIX_PATH "C:\\Qt\\6.9.2\\mingw_64")

find_package(Qt6 REQUIRED COMPONENTS Widgets)

# Defines your app target. 
add_executable(hello_qt src/main.cpp)
# Links Qt Widgets (pulls Core/Gui transitively). 
target_link_libraries(hello_qt PRIVATE Qt6::Widgets)

# On Windows, copy the Qt6Widgets DLL next to the exe for easy running from VS Code

if (WIN32) # Only run the following on Windows builds.
  add_custom_command(TARGET hello_qt POST_BUILD # Attach a command to the hello_qt target that runs after the target is built.
    # Run Qt’s windeployqt tool to copy all required Qt DLLs/plugins beside the built exe.
    COMMAND "${CMAKE_PREFIX_PATH}/bin/windeployqt.exe" --release "$<TARGET_FILE:hello_qt>"  
    VERBATIM) # Tell CMake not to reinterpret/escape arguments—pass them exactly as written.

  # For MinGW: copy runtime DLLs
  if (CMAKE_CXX_COMPILER_ID STREQUAL "GNU") # Guard: only do this when compiling with GCC/MinGW (not MSVC).
    add_custom_command(TARGET hello_qt POST_BUILD # Another post-build step on the same target.
        # Use CMake’s built-in command runner to copy files only if they differ (avoids needless writes).
      COMMAND ${CMAKE_COMMAND} -E copy_if_different 
        "C:/Qt/Tools/mingw1310_64/bin/libstdc++-6.dll"
        "C:/Qt/Tools/mingw1310_64/bin/libgcc_s_seh-1.dll"
        "C:/Qt/Tools/mingw1310_64/bin/libwinpthread-1.dll"
        "$<TARGET_FILE_DIR:hello_qt>") # Destination folder = the directory that contains the built exe.
  endif()
endif()