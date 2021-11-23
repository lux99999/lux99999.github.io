public class Circle {
    
    public static int count;                        // Static field. The Circle class itself has the only copy. 
    
    public int width;                               // Normal field. Each instance has its own copy.
    public String color;                            // Normal field. Each instance has its own copy.
    
    public Circle(int width, String color) {        // Constructor. Some languages actually call this "constructor" but in Java, you just define a method whose name matches the class's name.
        this.width = width;                         // "this" means the instance that is being constructed.
        this.color = color;                         // The constructor's job is to install values into the instance...
        Circle.count ++;                            // ...and to update the overall count of circles.
    }
    
    public void print() {                           // Normal method. You call this using an instance.
        System.out.println("I am a circle, " + this.width + " and " + this.color + "!");
    }
    
    public static void printCount() {               // Static method. You call this using the Circle class itself, and it can only refer to static fields.
        System.out.println("There are " + Circle.count + " circles.");
    }
    
}
